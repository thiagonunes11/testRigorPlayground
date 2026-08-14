/**
 * Browser environment detection helpers used by the OS & Browser demo page.
 *
 * Headless and private (incognito) browsing are not directly exposed by any web
 * API, so every check below is a heuristic. Each detector returns a verdict
 * object instead of a boolean:
 *
 *   { state, confidence, reason }
 *
 *   state:      "on" | "likely-on" | "off" | "inconclusive" | "unknown" | "unsupported"
 *   confidence: "high" | "medium" | "low" | "none"
 *   reason:     human readable explanation of what drove the verdict
 */

const GiB = 1024 ** 3;

/**
 * Chromium hands out a fixed storage quota in private windows and a
 * disk-derived one (capped) in normal windows. Measured on Chrome 151 / macOS:
 *
 *   normal window    -> exactly 10 GiB (10737418240)
 *   incognito window -> exactly  2 GiB (2147483648)
 *
 * Anything above this ceiling is normal-mode territory.
 */
export const CHROMIUM_PRIVATE_QUOTA_MAX = 2.5 * GiB;

/** Default window size of a headless Chromium instance. */
const HEADLESS_DEFAULT_SCREEN = { width: 800, height: 600 };

const SOFTWARE_RENDERER = /SwiftShader|llvmpipe|Mesa OffScreen|Software|Microsoft Basic Render/i;

export const formatBytes = (bytes) => {
  if (typeof bytes !== "number" || Number.isNaN(bytes)) return "Unknown";
  const units = ["B", "KiB", "MiB", "GiB", "TiB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const rounded = value >= 100 || Number.isInteger(value) ? Math.round(value) : value.toFixed(2);
  return `${rounded} ${units[unit]}`;
};

/**
 * Private-mode quotas are fixed powers of two (120 MiB, 1 GiB, 2 GiB), while a
 * normal-mode quota is a share of the free disk space and virtually never lands
 * on an exact power of two. This is what separates a real incognito window from
 * a normal window on an almost full disk.
 */
const isPowerOfTwo = (n) =>
  typeof n === "number" && n > 0 && Number.isInteger(Math.log2(n));

/**
 * Some of these APIs never settle in a headless browser (enumerateDevices was
 * measured hanging on Chrome 151 headless), so a reader that does not answer in
 * time falls back instead of stalling the whole verdict.
 */
const SIGNAL_TIMEOUT_MS = 1500;

const withTimeout = (promise, fallback) =>
  Promise.race([
    promise,
    new Promise((resolve) => setTimeout(() => resolve(fallback), SIGNAL_TIMEOUT_MS)),
  ]);

export const collectBrowserInfo = () => {
  const ua = navigator.userAgent || "";
  const vendor = navigator.vendor || "";
  const platform = navigator.platform || "";
  const languages = navigator.languages || [];
  const language = navigator.language || "";

  let uaData = null;
  try {
    if (navigator.userAgentData) {
      uaData = {
        brands: navigator.userAgentData.brands || [],
        mobile: navigator.userAgentData.mobile,
        platform: navigator.userAgentData.platform,
      };
    }
  } catch (_) { }

  return {
    ua,
    vendor,
    platform,
    language,
    languages,
    uaData,
  };
};

export const detectBrowserFamily = () => {
  const ua = navigator.userAgent || "";
  const vendor = navigator.vendor || "";

  // Firefox
  if (/Firefox\/\d+/i.test(ua)) {
    return "Firefox";
  }

  // Edge (Chromium)
  if (/Edg\//i.test(ua)) {
    return "Edge (Chromium)";
  }

  // Chrome / Chromium-based (Chrome, Brave, Opera, etc.)
  if (/Chrome\/\d+/i.test(ua) && /Google Inc/i.test(vendor)) {
    return "Chrome (Chromium)";
  }

  // Safari
  if (/Safari\/\d+/i.test(ua) && !/Chrome\/\d+/i.test(ua)) {
    return "Safari / WebKit";
  }

  // Fallback
  if (/Chrome|Chromium/i.test(ua)) {
    return "Chromium-based (other)";
  }

  return "Unknown";
};

/** Every Chromium flavour shares the same storage quota behaviour. */
export const isChromiumFamily = (family) =>
  /Chrome|Chromium|Edge|Opera|Brave/i.test(family || "");

export const getOSInfo = () => {
  const ua = navigator.userAgent;
  const platform =
    navigator.userAgentData?.platform ||
    /(Windows|Macintosh|Linux|Android|iPhone|iPad|iPod)/.exec(ua)?.[0] ||
    "Unknown";

  let name = "Unknown";
  if (/Windows NT 10\.0/.test(ua)) name = "Windows 10/11";
  else if (/Windows NT 6\.3/.test(ua)) name = "Windows 8.1";
  else if (/Windows NT 6\.2/.test(ua)) name = "Windows 8";
  else if (/Windows NT 6\.1/.test(ua)) name = "Windows 7";
  else if (/Mac OS X/.test(ua)) name = "macOS";
  else if (/Android/.test(ua)) name = "Android";
  else if (/(iPhone|iPad|iPod)/.test(ua)) name = "iOS";
  else if (/Linux/.test(ua)) name = "Linux";

  // Prefer platformVersion (UA-CH) over UA parsing
  const uaChVersion = navigator.userAgentData?.platformVersion; // ex: "14.0.0"
  const uaParsedVersion = (
    ua.match(/Android\s([\d._]+)/)?.[1] || ua.match(/OS\s([\d_]+)/)?.[1]
  )?.replace(/_/g, ".");

  const version = uaChVersion || uaParsedVersion || "Unknown";
  return { name, platform, version };
};

/**
 * Storage quota offered to this origin, in bytes, or null when unavailable.
 * navigator.webkitTemporaryStorage is the fallback for older Chromium builds
 * that predate StorageManager.estimate().
 */
export const readStorageQuota = async () => {
  try {
    if (navigator.storage?.estimate) {
      const { quota } = (await withTimeout(navigator.storage.estimate(), {})) ?? {};
      if (typeof quota === "number") return quota;
    }
  } catch (_) { }

  try {
    if (navigator.webkitTemporaryStorage?.queryUsageAndQuota) {
      return await withTimeout(
        new Promise((resolve) => {
          navigator.webkitTemporaryStorage.queryUsageAndQuota(
            (_usage, quota) => resolve(typeof quota === "number" ? quota : null),
            () => resolve(null)
          );
        }),
        null
      );
    }
  } catch (_) { }

  return null;
};

/**
 * Private / incognito browsing verdict.
 *
 * Chromium: compares the storage quota against the fixed private-mode ceiling.
 * Firefox:  Service Workers are unavailable in private windows.
 * Safari:    no reliable signal on current versions, reported as unsupported.
 */
export const detectPrivateMode = (family, quota) => {
  if (isChromiumFamily(family)) {
    if (quota === null || quota === undefined) {
      return {
        state: "unknown",
        confidence: "none",
        reason: "Storage quota is unavailable, so no verdict can be produced.",
      };
    }

    if (quota > CHROMIUM_PRIVATE_QUOTA_MAX) {
      return {
        state: "off",
        confidence: "high",
        reason: `Quota of ${formatBytes(quota)} is above the ${formatBytes(
          CHROMIUM_PRIVATE_QUOTA_MAX
        )} private-mode ceiling.`,
      };
    }

    if (isPowerOfTwo(quota)) {
      return {
        state: "on",
        confidence: "high",
        reason: `Quota is exactly ${formatBytes(
          quota
        )}, the fixed allowance handed out to private windows.`,
      };
    }

    return {
      state: "likely-on",
      confidence: "low",
      reason: `Quota of ${formatBytes(
        quota
      )} is below the private-mode ceiling but is not a fixed allowance, so an almost full disk cannot be ruled out.`,
    };
  }

  if (/Firefox/i.test(family)) {
    // navigator.serviceWorker is also missing on insecure origins, which would
    // otherwise read as a false positive.
    if (!window.isSecureContext) {
      return {
        state: "unknown",
        confidence: "none",
        reason:
          "The Firefox check relies on Service Worker availability, which is also blocked on insecure origins.",
      };
    }

    if (navigator.serviceWorker === undefined) {
      return {
        state: "on",
        confidence: "medium",
        reason: "Service Workers are unavailable, as they are in Firefox private windows.",
      };
    }

    return {
      state: "off",
      confidence: "medium",
      reason: "Service Workers are available, which private Firefox windows do not allow.",
    };
  }

  return {
    state: "unsupported",
    confidence: "none",
    reason: `No reliable private-mode signal exists for ${family || "this browser"}.`,
  };
};

const readWebGlRenderer = () => {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return "";
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    return debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER);
  } catch (_) {
    return "";
  }
};

const countMediaDevices = async () => {
  try {
    if (!navigator.mediaDevices?.enumerateDevices) return null;
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.length;
  } catch (_) {
    return null;
  }
};

const readNotificationPermissionState = async () => {
  try {
    if (!navigator.permissions?.query) return null;
    const status = await navigator.permissions.query({ name: "notifications" });
    return status.state;
  } catch (_) {
    return null;
  }
};

/**
 * Individual headless signals, each with the raw value it was derived from.
 * No single signal is decisive: the user agent token is authoritative when
 * present but automation tools routinely override the user agent, while the
 * remaining signals fire on containerised Linux runners and stay silent on a
 * headless macOS or Windows browser.
 */
export const collectHeadlessSignals = async () => {
  const ua = navigator.userAgent || "";
  const renderer = readWebGlRenderer();
  const [mediaDeviceCount, notificationPermissionState] = await Promise.all([
    withTimeout(countMediaDevices(), null),
    withTimeout(readNotificationPermissionState(), null),
  ]);
  const notificationPermission =
    typeof Notification !== "undefined" ? Notification.permission : null;

  const signals = [
    {
      id: "uaHeadlessToken",
      label: "User agent reports a headless build",
      matched: /Headless/i.test(ua),
      value: ua,
    },
    {
      id: "missingWindowChrome",
      label: "window.chrome missing on a Chrome user agent",
      matched: /Chrome\/\d+/.test(ua) && !window.chrome,
      value: `window.chrome: ${typeof window.chrome}`,
    },
    {
      id: "zeroOuterSize",
      label: "Window reports no outer dimensions",
      matched: window.outerWidth === 0 || window.outerHeight === 0,
      value: `${window.outerWidth} x ${window.outerHeight}`,
    },
    {
      id: "defaultHeadlessScreen",
      label: "Screen matches the headless default size",
      matched:
        window.screen.width === HEADLESS_DEFAULT_SCREEN.width &&
        window.screen.height === HEADLESS_DEFAULT_SCREEN.height,
      value: `${window.screen.width} x ${window.screen.height}`,
    },
    {
      id: "softwareRenderer",
      label: "WebGL is backed by a software renderer",
      matched: SOFTWARE_RENDERER.test(renderer),
      value: renderer || "Unavailable",
    },
    {
      id: "noMediaDevices",
      label: "No media devices are exposed",
      matched: mediaDeviceCount === 0,
      value: mediaDeviceCount === null ? "Unavailable" : String(mediaDeviceCount),
    },
    {
      id: "emptyPlugins",
      label: "Plugin list is empty",
      matched: navigator.plugins.length === 0,
      value: String(navigator.plugins.length),
    },
    {
      id: "notificationMismatch",
      label: "Notification permission disagrees with the Permissions API",
      matched:
        notificationPermission === "denied" && notificationPermissionState === "prompt",
      value: `${notificationPermission ?? "Unavailable"} / ${notificationPermissionState ?? "Unavailable"
        }`,
    },
  ];

  const matched = signals.filter((signal) => signal.matched);
  const uaToken = signals.find((signal) => signal.id === "uaHeadlessToken");

  let verdict;
  if (uaToken.matched) {
    verdict = {
      state: "on",
      confidence: "high",
      reason: "The user agent identifies a headless browser build.",
    };
  } else if (matched.length >= 2) {
    verdict = {
      state: "likely-on",
      confidence: "medium",
      reason: `${matched.length} headless signals matched: ${matched
        .map((signal) => signal.id)
        .join(", ")}.`,
    };
  } else if (matched.length === 1) {
    verdict = {
      state: "inconclusive",
      confidence: "low",
      reason: `Only ${matched[0].id} matched, which also happens on regular browsers.`,
    };
  } else {
    verdict = {
      state: "off",
      confidence: "medium",
      reason: "No headless signal matched.",
    };
  }

  return { signals, verdict };
};

/**
 * WebDriver only tells whether the page is being driven by automation. A
 * visible browser under Selenium/testRigor sets it, and a plain headless
 * browser started without automation flags does not, so it is reported on its
 * own rather than folded into the headless verdict.
 */
export const detectAutomation = () => {
  const webdriver = navigator.webdriver === true;
  return {
    webdriver,
    verdict: {
      state: webdriver ? "on" : "off",
      confidence: "high",
      reason: webdriver
        ? "navigator.webdriver is true, so this page is being driven by automation."
        : "navigator.webdriver is false.",
    },
  };
};

export const VERDICT_LABELS = {
  on: "On",
  "likely-on": "Likely on",
  off: "Off",
  inconclusive: "Inconclusive",
  unknown: "Unknown",
  unsupported: "Not detectable in this browser",
};

export const verdictLabel = (verdict) =>
  verdict ? VERDICT_LABELS[verdict.state] ?? verdict.state : "Detecting…";

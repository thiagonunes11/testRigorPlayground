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

const readTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
  } catch (_) {
    return "Unknown";
  }
};

/**
 * Single pass over everything the verdicts below need, so the WebGL context and
 * the async readers are only exercised once.
 */
export const probeEnvironment = async () => {
  const [mediaDeviceCount, notificationPermissionState] = await Promise.all([
    withTimeout(countMediaDevices(), null),
    withTimeout(readNotificationPermissionState(), null),
  ]);

  return {
    ua: navigator.userAgent || "",
    renderer: readWebGlRenderer(),
    mediaDeviceCount,
    notificationPermissionState,
    notificationPermission:
      typeof Notification !== "undefined" ? Notification.permission : null,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
    pluginCount: navigator.plugins.length,
    pdfViewerEnabled: navigator.pdfViewerEnabled,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory,
    timeZone: readTimeZone(),
    webdriver: navigator.webdriver === true,
  };
};

/**
 * Signals are split into two tiers, because mixing them is what produces false
 * positives on cloud runners.
 *
 * "window"      -> only a browser without a window produces this value.
 * "environment" -> the machine, not the window: a GPU-less container yields the
 *                  same values with a perfectly visible browser. Measured on a
 *                  testRigor run (Chrome 135, Linux X11): a software renderer
 *                  and an empty plugin list, with a real 1280x1024 screen.
 *
 * Only "window" signals can push the verdict towards headless. Environment
 * signals feed the runner verdict instead.
 */
export const buildHeadlessSignals = (probe) => [
  {
    id: "uaHeadlessToken",
    label: "User agent reports a headless build",
    tier: "window",
    matched: /Headless/i.test(probe.ua),
    value: probe.ua,
  },
  {
    id: "missingWindowChrome",
    label: "window.chrome missing on a Chrome user agent",
    tier: "window",
    matched: /Chrome\/\d+/.test(probe.ua) && !window.chrome,
    value: `window.chrome: ${typeof window.chrome}`,
  },
  {
    id: "zeroOuterSize",
    label: "Window reports no outer dimensions",
    tier: "window",
    matched: probe.outerWidth === 0 || probe.outerHeight === 0,
    value: `${probe.outerWidth} x ${probe.outerHeight}`,
  },
  {
    id: "defaultHeadlessScreen",
    label: "Screen matches the headless default size",
    tier: "window",
    matched:
      probe.screenWidth === HEADLESS_DEFAULT_SCREEN.width &&
      probe.screenHeight === HEADLESS_DEFAULT_SCREEN.height,
    value: `${probe.screenWidth} x ${probe.screenHeight}`,
  },
  {
    // Headless Chrome keeps reporting its 800x600 default screen while honouring
    // --window-size, so the page ends up bigger than the screen it lives on.
    //
    // This compares the VIEWPORT, not the outer window. The outer window is the
    // viewport plus the browser's own decorations, so on a window that fills the
    // screen the outer size legitimately exceeds it — measured at 1288x805 outer
    // against a 1280x720 screen on a perfectly visible Chrome 149, which is what
    // the outer-based version of this signal reported as headless. The viewport
    // lives inside the window, which lives on the screen, so a viewport larger
    // than the screen has no innocent explanation.
    id: "viewportExceedsScreen",
    label: "Viewport is larger than the reported screen",
    tier: "window",
    matched: probe.innerWidth > probe.screenWidth || probe.innerHeight > probe.screenHeight,
    value: `viewport ${probe.innerWidth} x ${probe.innerHeight} vs screen ${probe.screenWidth} x ${probe.screenHeight}`,
  },
  {
    id: "softwareRenderer",
    label: "WebGL is backed by a software renderer",
    tier: "environment",
    matched: SOFTWARE_RENDERER.test(probe.renderer),
    value: probe.renderer || "Unavailable",
  },
  {
    id: "noMediaDevices",
    label: "No media devices are exposed",
    tier: "environment",
    matched: probe.mediaDeviceCount === 0,
    value: probe.mediaDeviceCount === null ? "Unavailable" : String(probe.mediaDeviceCount),
  },
  {
    id: "emptyPlugins",
    label: "Plugin list is empty",
    tier: "environment",
    matched: probe.pluginCount === 0,
    value: String(probe.pluginCount),
  },
  {
    id: "noReservedScreenArea",
    label: "Screen reserves no space for a taskbar or dock",
    tier: "environment",
    matched:
      probe.availWidth === probe.screenWidth && probe.availHeight === probe.screenHeight,
    value: `available ${probe.availWidth} x ${probe.availHeight} of ${probe.screenWidth} x ${probe.screenHeight}`,
  },
  {
    id: "notificationMismatch",
    label: "Notification permission disagrees with the Permissions API",
    tier: "environment",
    matched:
      probe.notificationPermission === "denied" &&
      probe.notificationPermissionState === "prompt",
    value: `${probe.notificationPermission ?? "Unavailable"} / ${probe.notificationPermissionState ?? "Unavailable"
      }`,
  },
];

const listIds = (signals) => signals.map((signal) => signal.id).join(", ");

/**
 * `runnerVerdict` comes from detectRunnerEnvironment and only decides what an
 * ABSENCE of window signals means. A modern `--headless=new` Chrome is
 * deliberately indistinguishable from a headed one — plugin count, PDF viewer,
 * window.chrome and chrome.loadTimes were all measured identical on Chrome 149 —
 * so once the user agent is masked, the only place a headless browser can still
 * be hiding is an automation runner. On a plain desktop the same absence of
 * signals is simply a normal browser, and reporting that as "inconclusive" made
 * every ordinary visitor look suspicious.
 */
export const detectHeadless = (signals, runnerVerdict) => {
  const windowSignals = signals.filter((s) => s.tier === "window" && s.matched);
  const environmentSignals = signals.filter((s) => s.tier === "environment" && s.matched);
  const uaToken = signals.find((signal) => signal.id === "uaHeadlessToken");
  const onRunner = runnerVerdict?.state === "on" || runnerVerdict?.state === "likely-on";

  if (uaToken.matched) {
    return {
      state: "on",
      confidence: "high",
      reason: "The user agent identifies a headless browser build.",
    };
  }

  if (windowSignals.length >= 2) {
    return {
      state: "likely-on",
      confidence: "medium",
      reason: `${windowSignals.length} window-level signals matched: ${listIds(
        windowSignals
      )}.`,
    };
  }

  if (windowSignals.length === 1) {
    return {
      state: "likely-on",
      confidence: "low",
      reason: `${windowSignals[0].id} matched, which points at a browser without a window.`,
    };
  }

  if (onRunner) {
    return {
      state: "inconclusive",
      confidence: "low",
      reason: `No window-level signal matched, but this looks like an automation runner${environmentSignals.length ? ` (${listIds(environmentSignals)})` : ""
        }. A headless browser whose user agent has been masked cannot be ruled out here, because a modern headless Chrome is otherwise identical to a headed one.`,
    };
  }

  return {
    state: "off",
    confidence: environmentSignals.length > 0 ? "low" : "medium",
    reason: environmentSignals.length
      ? `No window-level signal matched. ${listIds(
        environmentSignals
      )} did, but those describe the machine rather than the window, and this does not look like an automation runner.`
      : "No headless signal matched.",
  };
};

/**
 * Runner environment: whether this looks like a browser on an automation
 * runner (cloud VM, container, virtual display) rather than a desktop. This is
 * what the environment-tier signals actually measure, and on a testRigor run it
 * is the question that can be answered with confidence — unlike headless.
 */
export const detectRunnerEnvironment = (probe, signals) => {
  const hints = [];
  const add = (id, matched, value) => hints.push({ id, matched, value });

  const environmentSignals = signals.filter((s) => s.tier === "environment");
  environmentSignals.forEach((signal) => add(signal.id, signal.matched, signal.value));

  add("webdriverFlag", probe.webdriver, `navigator.webdriver: ${probe.webdriver}`);
  add(
    "noWebGl",
    !probe.renderer,
    probe.renderer ? "WebGL available" : "WebGL context unavailable"
  );
  add(
    "lowCpuCount",
    typeof probe.hardwareConcurrency === "number" && probe.hardwareConcurrency <= 2,
    `hardwareConcurrency: ${probe.hardwareConcurrency ?? "Unavailable"}`
  );
  add("utcTimeZone", /^(UTC|Etc\/UTC|GMT)$/i.test(probe.timeZone), probe.timeZone);

  const matched = hints.filter((hint) => hint.matched);
  const hasGpuLessRendering =
    matched.some((hint) => hint.id === "softwareRenderer" || hint.id === "noWebGl");

  let verdict;
  if (probe.webdriver && matched.length >= 2) {
    const others = matched.filter((hint) => hint.id !== "webdriverFlag");
    verdict = {
      state: "on",
      label: "Automation runner (likely)",
      confidence: hasGpuLessRendering ? "high" : "medium",
      reason: `Driven by automation, plus ${others.length === 1 ? "1 further runner hint" : `${others.length} further runner hints`
        }: ${listIds(others)}.`,
    };
  } else if (matched.length >= 3) {
    verdict = {
      state: "likely-on",
      label: "Automation runner (likely)",
      confidence: "low",
      reason: `${matched.length} runner hints matched (${listIds(
        matched
      )}), but nothing reports automation.`,
    };
  } else if (matched.length > 0) {
    verdict = {
      state: "inconclusive",
      label: "Inconclusive",
      confidence: "low",
      reason: `Only ${listIds(matched)} matched, which a desktop browser can also produce.`,
    };
  } else {
    verdict = {
      state: "off",
      label: "Regular desktop browser",
      confidence: "medium",
      reason: "No runner hint matched.",
    };
  }

  return { hints, verdict };
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

/** Verdicts may carry their own label when "On"/"Off" would not read well. */
export const verdictLabel = (verdict) => {
  if (!verdict) return "Detecting…";
  return verdict.label ?? VERDICT_LABELS[verdict.state] ?? verdict.state;
};

/** Raw values worth showing so a run can be diagnosed from a screenshot alone. */
export const environmentDetails = (probe) => [
  { id: "window", label: "Window (outer)", value: `${probe.outerWidth} x ${probe.outerHeight}` },
  { id: "viewport", label: "Viewport (inner)", value: `${probe.innerWidth} x ${probe.innerHeight}` },
  {
    id: "browserUi",
    label: "Browser UI height (outer − inner)",
    value: `${probe.outerHeight - probe.innerHeight} px`,
  },
  { id: "screen", label: "Screen", value: `${probe.screenWidth} x ${probe.screenHeight}` },
  {
    id: "availableScreen",
    label: "Available screen area",
    value: `${probe.availWidth} x ${probe.availHeight}`,
  },
  { id: "renderer", label: "WebGL renderer", value: probe.renderer || "Unavailable" },
  {
    id: "mediaDevices",
    label: "Media devices",
    value: probe.mediaDeviceCount === null ? "Unavailable" : String(probe.mediaDeviceCount),
  },
  { id: "plugins", label: "Plugins", value: String(probe.pluginCount) },
  {
    id: "pdfViewer",
    label: "PDF viewer enabled",
    value: probe.pdfViewerEnabled === undefined ? "Unavailable" : String(probe.pdfViewerEnabled),
  },
  {
    id: "cpuCores",
    label: "CPU cores reported",
    value: String(probe.hardwareConcurrency ?? "Unavailable"),
  },
  {
    id: "deviceMemory",
    label: "Device memory (GiB)",
    value: String(probe.deviceMemory ?? "Unavailable"),
  },
  { id: "timeZone", label: "Time zone", value: probe.timeZone },
];

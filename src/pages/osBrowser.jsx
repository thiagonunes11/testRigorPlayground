import React, { useMemo, useEffect, useState } from "react";
import { Container, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";
import Layout from "../components/Layout";
import "../styles/homePage.css";

const collectBrowserInfo = () => {
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

const detectBrowserFamily = () => {
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

const getOSInfo = () => {
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

const detectHeadless = () => {
  try {
    const ua = navigator.userAgent || "";
    const webdriver = navigator.webdriver === true;
    const uaHeadless = /HeadlessChrome|HeadlessFirefox/i.test(ua);
    return webdriver || uaHeadless; // boolean
  } catch {
    return false;
  }
};

const OsBrowser = () => {
  const [isHeadless, setIsHeadless] = useState(null);
  const [isIncognito, setIsIncognito] = useState(null);

  const [browserFamily, setBrowserFamily] = useState("Unknown");
  const [uaSummary, setUaSummary] = useState({});
  const [quota, setQuota] = useState(null);

  const [wfsSupported, setWfsSupported] = useState(false);
  const [wfsResult, setWfsResult] = useState("not_called"); // "success" | "error" | "not_called"
  const [wfsErrorName, setWfsErrorName] = useState("");

  const os = useMemo(getOSInfo, []);
  const [deviceModel, setDeviceModel] = useState("Unavailable");
  const [platformVersion, setPlatformVersion] = useState(
    os.version || "Unknown"
  );


  const testWebkitRequestFileSystem = async () => {
    try {
      const w = window;
      if (!w.webkitRequestFileSystem) {
        setWfsSupported(false);
        setWfsResult("not_supported");
        setWfsErrorName("");
        return;
      }

      setWfsSupported(true);

      await new Promise((resolve) => {
        w.webkitRequestFileSystem(
          w.TEMPORARY,
          1024,
          () => {
            setWfsResult("success");
            setWfsErrorName("");
            resolve();
          },
          (err) => {
            setWfsResult("error");
            setWfsErrorName((err && err.name) || "");
            resolve();
          }
        );
      });
    } catch (e) {
      setWfsSupported(true);
      setWfsResult("error");
      setWfsErrorName(e.name || String(e));
    }
  };

  useEffect(() => {
    // Try high-entropy UA-CH for model and platformVersion on supporting browsers (Chromium on Android)
    const uad = navigator.userAgentData;
    if (uad?.getHighEntropyValues) {
      uad
        .getHighEntropyValues(["platform", "platformVersion", "model"])
        .then((hints) => {
          if (hints.model) setDeviceModel(hints.model);
          if (hints.platformVersion) setPlatformVersion(hints.platformVersion);
        })
        .catch(() => { });
    }
  }, [os.version]);

  useEffect(() => {
    const fam = detectBrowserFamily();
    setBrowserFamily(fam);
    const info = collectBrowserInfo();
    setUaSummary(info);
    (async () => {
      try {
        if (navigator.storage && navigator.storage.estimate) {
          const result = await navigator.storage.estimate();
          setQuota(result.quota);

        }
      } catch (err) {
        setQuota(null);
      }
    })();
    (async () => {
      await testWebkitRequestFileSystem();
    })();
    const head = detectHeadless();
    setIsHeadless(head);
  }, []);

  useEffect(() => {
    browserFamily === "Chrome (Chromium)" && quota !== null && quota < 100000000000 ? setIsIncognito(true) : setIsIncognito(false);
  }, [quota]);


  return (
    <Layout
      title="OS & Browser Validation"
      description="Detect the operating system and browser details from the current client."
    >
      <Container>
        <Row>
          <Col>
            <div className="modern-card">
              <h2>Operating System</h2>
              <div className="info-block">
                <p>
                  <b>Name:</b> {os.name}
                </p>
                <p>
                  <b>Platform:</b> {os.platform}
                </p>
                <p>
                  <b>Version:</b> {platformVersion}
                </p>
                <p>
                  <b>Device model:</b> {deviceModel}
                </p>
              </div>
            </div>
          </Col>
          <Col>
            <div className="modern-card">
              <h5 className="fw-bold mb-2">
                Browser Information
              </h5>

              <p>
                <strong>Browser Family:</strong> {browserFamily}
              </p>

              <p className="text-muted small mb-1">
                <strong>User-Agent:</strong> {uaSummary.ua}
              </p>

              <p className="text-muted small mb-1">
                <strong>Vendor:</strong> {uaSummary.vendor}
              </p>

              <p className="text-muted small mb-1">
                <strong>Platform:</strong> {uaSummary.platform}
              </p>

              <p className="text-muted small mb-1">
                <strong>Language:</strong> {uaSummary.language}
              </p>

              <p className="text-muted small mb-1">
                <strong>Languages:</strong> {uaSummary.languages?.join(", ")}
              </p>

              <p className="text-muted small mb-1">
                <strong>Quota:</strong>
                {quota}
              </p>
              <p>
                <strong>webkitRequestFileSystem supported:</strong>{" "}
                {wfsSupported ? "yes" : "no"}
              </p>
              <p>
                <strong>webkitRequestFileSystem result:</strong> {wfsResult}
              </p>
              <p>
                <strong>webkitRequestFileSystem error:</strong>{" "}
                {wfsErrorName || "(none)"}{" "}
              </p>
            </div>
          </Col>
          <Col>
            <div className="modern-card">
              <h5 className="fw-bold mb-2">Headless Mode</h5>
              <p className="text-muted mb-0">
                Status:{" "}
                {isHeadless === null ? "Detecting…" : isHeadless ? "On" : "Off"}
              </p>
            </div>
          </Col>
          <Col>
            <div className="modern-card">
              <div className="position-relative mb-2">
                <h5 className="fw-bold mb-0 text-center">Incognito Mode</h5>
                <OverlayTrigger
                  placement="left"
                  overlay={
                    <Tooltip id="incognito-info-tooltip">
                      For Chrome, incognito mode is being determined with the size of quota offered by the browser
                    </Tooltip>
                  }
                >
                  <InfoCircle
                    className="text-muted position-absolute"
                    size={18}
                    style={{ right: 0, top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
                  />
                </OverlayTrigger>
              </div>
              <p className="text-muted mb-0">
                Status:{" "}
                {isIncognito === null
                  ? "Detecting…"
                  : isIncognito
                    ? "On"
                    : "Off"}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default OsBrowser;

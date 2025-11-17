import { useState, useEffect } from "react";
import { Container, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";
import Layout from "../components/Layout";
const EnvironmentTester = () => {
  const [isHeadless, setIsHeadless] = useState(null);
  const [isIncognito, setIsIncognito] = useState(null);

  //Handling incognito detection

  const [browserFamily, setBrowserFamily] = useState("Unknown");
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

  const [uaSummary, setUaSummary] = useState({});
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

  const [quota, setQuota] = useState(null);

  const [wfsSupported, setWfsSupported] = useState(false);
  const [wfsResult, setWfsResult] = useState("not_called"); // "success" | "error" | "not_called"
  const [wfsErrorName, setWfsErrorName] = useState("");

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

  //Handling headless detection
  const detectHeadless = () => {
    try {
      const ua = navigator.userAgent || "";
      const webdriver = navigator.webdriver === true;
      const uaHeadless = /HeadlessChrome|HeadlessFirefox/i.test(ua);

      //   try {
      //     window.__env = {
      //       headless_raw: { webdriver, uaHeadless, ua },
      //     };
      //   } catch {}

      return webdriver || uaHeadless; // boolean
    } catch {
      return false;
    }
  };

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
      title="Environment Tester"
      description="Detect if the browser is running in headless mode, and/or in incognito browsing."
    >
      <Container>
        <Row>
          <Col>
            <div className="border rounded p-3 text-center">
              <h5 className="fw-bold mb-2">Headless Mode</h5>
              <p className="text-muted mb-0">
                Status:{" "}
                {isHeadless === null ? "Detecting…" : isHeadless ? "On" : "Off"}
              </p>
            </div>
          </Col>
          <Col>
            <div className="border rounded p-3 text-center">
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
        <div className="border rounded p-3 text-center">
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
      </Container>
    </Layout>
  );
};

export default EnvironmentTester;

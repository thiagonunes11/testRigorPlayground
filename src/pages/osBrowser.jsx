import React, { useMemo, useEffect, useState } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";
import Layout from "../components/Layout";
import {
  CHROMIUM_PRIVATE_QUOTA_MAX,
  collectBrowserInfo,
  collectHeadlessSignals,
  detectAutomation,
  detectBrowserFamily,
  detectPrivateMode,
  formatBytes,
  getOSInfo,
  readStorageQuota,
  verdictLabel,
} from "../utils/environmentDetection";
import "../styles/homePage.css";

const CONFIDENCE_LABELS = {
  high: "High",
  medium: "Medium",
  low: "Low",
  none: "None",
};

const VerdictCard = ({ title, testId, verdict, tooltip }) => (
  <div className="modern-card h-100">
    <div className="position-relative mb-2">
      <h5 className="fw-bold mb-0 text-center">{title}</h5>
      {tooltip && (
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id={`${testId}-tooltip`}>{tooltip}</Tooltip>}
        >
          <InfoCircle
            className="text-muted position-absolute"
            size={18}
            style={{ right: 0, top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
          />
        </OverlayTrigger>
      )}
    </div>
    <p className="mb-1">
      Status: <span data-testid={`${testId}-status`}>{verdictLabel(verdict)}</span>
    </p>
    <p className="text-muted small mb-1">
      Confidence:{" "}
      <span data-testid={`${testId}-confidence`}>
        {verdict ? CONFIDENCE_LABELS[verdict.confidence] ?? verdict.confidence : "—"}
      </span>
    </p>
    <p className="text-muted small mb-0" data-testid={`${testId}-reason`}>
      {verdict ? verdict.reason : "Running detection…"}
    </p>
  </div>
);

const OsBrowser = () => {
  const [headless, setHeadless] = useState(null);
  const [headlessSignals, setHeadlessSignals] = useState([]);
  const [incognito, setIncognito] = useState(null);

  const [browserFamily, setBrowserFamily] = useState("Unknown");
  const [uaSummary, setUaSummary] = useState({});
  const [quota, setQuota] = useState(null);

  const automation = useMemo(detectAutomation, []);
  const os = useMemo(getOSInfo, []);
  const [deviceModel, setDeviceModel] = useState("Unavailable");
  const [platformVersion, setPlatformVersion] = useState(os.version || "Unknown");

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
    let active = true;

    const family = detectBrowserFamily();
    setBrowserFamily(family);
    setUaSummary(collectBrowserInfo());

    (async () => {
      // The quota is read before any verdict is published, so the cards never
      // show a confident answer derived from a value that is not in yet.
      const measuredQuota = await readStorageQuota();
      if (!active) return;
      setQuota(measuredQuota);
      setIncognito(detectPrivateMode(family, measuredQuota));
    })();

    (async () => {
      const { signals, verdict } = await collectHeadlessSignals();
      if (!active) return;
      setHeadlessSignals(signals);
      setHeadless(verdict);
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Layout
      title="OS & Browser Validation"
      description="Detect the operating system and browser details from the current client."
    >
      <Container>
        <Row className="g-3">
          <Col md={6}>
            <div className="modern-card h-100">
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
          <Col md={6}>
            <div className="modern-card h-100">
              <h5 className="fw-bold mb-2">Browser Information</h5>

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
                <strong>Storage quota:</strong>{" "}
                <span data-testid="storage-quota">
                  {quota === null ? "Unavailable" : formatBytes(quota)}
                </span>
              </p>

              <p className="text-muted small mb-0">
                <strong>Storage quota (bytes):</strong>{" "}
                <span data-testid="storage-quota-bytes">{quota === null ? "0" : quota}</span>
              </p>
            </div>
          </Col>
        </Row>

        <Row className="g-3 mt-1">
          <Col md={4}>
            <VerdictCard
              title="Automation (WebDriver)"
              testId="automation"
              verdict={automation.verdict}
              tooltip="Reads navigator.webdriver. It reports automation, not headless: a visible browser driven by Selenium or testRigor sets it too."
            />
          </Col>
          <Col md={4}>
            <VerdictCard
              title="Headless Mode"
              testId="headless"
              verdict={headless}
              tooltip="A headless user agent token is decisive. Otherwise the verdict comes from how many of the signals below matched, since none of them is conclusive on its own."
            />
          </Col>
          <Col md={4}>
            <VerdictCard
              title="Incognito Mode"
              testId="incognito"
              verdict={incognito}
              tooltip={`On Chromium, private windows get a fixed storage quota (2 GiB) while normal windows get a disk-derived one capped at 10 GiB. Quotas above ${formatBytes(
                CHROMIUM_PRIVATE_QUOTA_MAX
              )} rule private mode out. On Firefox the check is Service Worker availability; Safari exposes no reliable signal.`}
            />
          </Col>
        </Row>

        <Row className="g-3 mt-1">
          <Col>
            <div className="modern-card">
              <h5 className="fw-bold mb-2">Headless Signals</h5>
              <p className="text-muted small">
                Raw values behind the headless verdict. Each signal is a hint on its own.
              </p>
              <table className="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col">Signal</th>
                    <th scope="col">Matched</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {headlessSignals.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-muted">
                        Collecting signals…
                      </td>
                    </tr>
                  ) : (
                    headlessSignals.map((signal) => (
                      <tr key={signal.id} data-testid={`headless-signal-${signal.id}`}>
                        <td>{signal.label}</td>
                        <td data-testid={`headless-signal-${signal.id}-matched`}>
                          {signal.matched ? "Yes" : "No"}
                        </td>
                        <td className="text-muted small text-break">{signal.value}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default OsBrowser;

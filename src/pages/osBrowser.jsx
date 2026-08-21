import React, { useMemo, useEffect, useState } from "react";
import { Container, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";
import Layout from "../components/Layout";
import {
  CHROMIUM_PRIVATE_QUOTA_MAX,
  buildHeadlessSignals,
  collectBrowserInfo,
  detectAutomation,
  detectBrowserFamily,
  detectHeadless,
  detectPrivateMode,
  detectRunnerEnvironment,
  environmentDetails,
  formatBytes,
  getOSInfo,
  probeEnvironment,
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

const SignalTable = ({ title, description, rows, testIdPrefix, showTier }) => (
  <div className="modern-card">
    <h5 className="fw-bold mb-2">{title}</h5>
    <p className="text-muted small">{description}</p>
    <table className="table table-sm align-middle mb-0">
      <thead>
        <tr>
          <th scope="col">Signal</th>
          {showTier && <th scope="col">Tier</th>}
          <th scope="col">Matched</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={showTier ? 4 : 3} className="text-muted">
              Collecting signals…
            </td>
          </tr>
        ) : (
          rows.map((row) => (
            <tr key={row.id} data-testid={`${testIdPrefix}-${row.id}`}>
              <td>{row.label ?? row.id}</td>
              {showTier && (
                <td className="text-muted small">
                  {row.tier === "window" ? "Window" : "Environment"}
                </td>
              )}
              <td data-testid={`${testIdPrefix}-${row.id}-matched`}>
                {row.matched ? "Yes" : "No"}
              </td>
              <td className="text-muted small text-break">{row.value}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

const OsBrowser = () => {
  const [headless, setHeadless] = useState(null);
  const [headlessSignals, setHeadlessSignals] = useState([]);
  const [runner, setRunner] = useState(null);
  const [runnerHints, setRunnerHints] = useState([]);
  const [details, setDetails] = useState([]);
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
      const probe = await probeEnvironment();
      if (!active) return;
      const signals = buildHeadlessSignals(probe);
      const { hints, verdict: runnerVerdict } = detectRunnerEnvironment(probe, signals);
      setHeadlessSignals(signals);
      setHeadless(detectHeadless(signals, runnerVerdict));
      setRunnerHints(hints);
      setRunner(runnerVerdict);
      setDetails(environmentDetails(probe));
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
          <Col md={3}>
            <VerdictCard
              title="Automation (WebDriver)"
              testId="automation"
              verdict={automation.verdict}
              tooltip="Reads navigator.webdriver. It reports automation, not headless: a visible browser driven by Selenium or testRigor sets it too."
            />
          </Col>
          <Col md={3}>
            <VerdictCard
              title="Runner Environment"
              testId="runner"
              verdict={runner}
              tooltip="Whether this looks like a browser on an automation runner: no GPU, no taskbar, no media devices, few CPU cores. These are properties of the machine, not of the window, so they hold whether the browser is visible or not."
            />
          </Col>
          <Col md={3}>
            <VerdictCard
              title="Headless Mode"
              testId="headless"
              verdict={headless}
              tooltip="A headless user agent token is decisive. Otherwise only window-level signals count: environment signals such as a software renderer are produced by a visible browser on a cloud runner too, so on their own they leave the verdict inconclusive."
            />
          </Col>
          <Col md={3}>
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
            <SignalTable
              title="Detection Signals"
              description="Window-level signals are the only ones that can indicate headless mode. Environment-level signals describe the machine and feed the runner verdict, since a visible browser on a GPU-less runner produces them too."
              rows={headlessSignals}
              testIdPrefix="headless-signal"
              showTier
            />
          </Col>
        </Row>

        <Row className="g-3 mt-1">
          <Col md={6}>
            <SignalTable
              title="Runner Hints"
              description="Properties of the machine behind the Runner Environment verdict."
              rows={runnerHints}
              testIdPrefix="runner-hint"
            />
          </Col>
          <Col md={6}>
            <div className="modern-card">
              <h5 className="fw-bold mb-2">Environment Details</h5>
              <p className="text-muted small">
                Raw measurements, so a run can be diagnosed from a screenshot alone.
              </p>
              <table className="table table-sm align-middle mb-0">
                <tbody>
                  {details.length === 0 ? (
                    <tr>
                      <td className="text-muted">Measuring…</td>
                    </tr>
                  ) : (
                    details.map((detail) => (
                      <tr key={detail.id}>
                        <td>{detail.label}</td>
                        <td
                          className="text-muted small text-break"
                          data-testid={`environment-${detail.id}`}
                        >
                          {detail.value}
                        </td>
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

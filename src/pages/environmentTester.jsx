import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Layout from "../components/Layout";
const EnvironmentTester = () => {
  const [isHeadless, setIsHeadless] = useState(null);
  const [isIncognito, setIsIncognito] = useState(null);

  //Handling incognito detection
  const detectIncognito = async () => {
    //TODO
  };

  useEffect(() => {
    (async () => {
      const incog = await detectIncognito();
      setIsIncognito(incog);
    })();
  }, []);

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
    const head = detectHeadless();
    setIsHeadless(head);
  }, []);

  return (
    <Layout
      title="Environment Tester"
      description="Detect if the browser is running in headless mode, and/or in private browsing."
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
              <h5 className="fw-bold mb-2">Incognito Mode</h5>
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

export default EnvironmentTester;

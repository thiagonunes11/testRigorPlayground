import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/homePage.css";
import "../styles/mockApiPage.css";

// Same hosted backend used by the API Validation page
const API_URL = "https://tr-playground-api.onrender.com";

// Value sent on the POST so an unmocked round trip is recognisable
const POST_BODY = { source: "mock-api-playground", value: "REAL_ROUND_TRIP" };

// Every call is fired by a button, never on page load, so a mock rule can be
// registered before the request leaves the browser.
const scenarios = [
  {
    id: "rotatingCode",
    title: "GET a rotating value",
    method: "GET",
    path: "/code",
    savedValuePath: "code",
    hint:
      "The real endpoint answers with a different code on every call. Mock it to a fixed value: when the code stops changing between requests, the response on screen is the mocked one.",
  },
  {
    id: "echoGet",
    title: "GET on a POST-only endpoint",
    method: "GET",
    path: "/echo",
    savedValuePath: "value",
    hint:
      "The backend only accepts POST here, so without a mock this returns 404. Mock it with a body containing a \"value\" field and both the 200 and the value below come from the mock.",
  },
  {
    id: "echoPost",
    title: "POST with a body",
    method: "POST",
    path: "/echo",
    body: POST_BODY,
    savedValuePath: "received.value",
    hint:
      "Unmocked, the backend echoes the request back, so the saved value reads REAL_ROUND_TRIP. Any other value proves the mock answered instead of the backend.",
  },
];

// Pretty-print JSON when the response is JSON, otherwise show it untouched
const formatBody = (text) => {
  if (!text) return "(empty body)";
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
};

// Pull a dotted path out of a JSON body, for the saved value line
const extractValue = (text, path) => {
  if (!text || !path) return null;
  try {
    const found = path
      .split(".")
      .reduce((node, key) => (node == null ? node : node[key]), JSON.parse(text));
    if (found === null || found === undefined) return null;
    return typeof found === "object" ? JSON.stringify(found) : String(found);
  } catch {
    return null;
  }
};

const MockApiPage = () => {
  const [results, setResults] = useState({});
  const [pending, setPending] = useState({});
  const [requestCount, setRequestCount] = useState(0);

  const sendRequest = async (scenario) => {
    const attempt = requestCount + 1;
    setRequestCount(attempt);
    setPending((current) => ({ ...current, [scenario.id]: true }));

    const startedAt = performance.now();
    const options = { method: scenario.method };
    if (scenario.body) {
      options.headers = { "Content-Type": "application/json" };
      options.body = JSON.stringify(scenario.body);
    }

    try {
      const response = await fetch(`${API_URL}${scenario.path}`, options);
      const text = await response.text();
      setResults((current) => ({
        ...current,
        [scenario.id]: {
          attempt,
          reached: true,
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          elapsedMs: Math.round(performance.now() - startedAt),
          savedValue: extractValue(text, scenario.savedValuePath),
          body: formatBody(text),
        },
      }));
    } catch (error) {
      setResults((current) => ({
        ...current,
        [scenario.id]: {
          attempt,
          reached: false,
          elapsedMs: Math.round(performance.now() - startedAt),
          savedValue: null,
          body: `Request failed: ${error.message}`,
        },
      }));
    } finally {
      setPending((current) => ({ ...current, [scenario.id]: false }));
    }
  };

  const clearResults = () => {
    setResults({});
    setRequestCount(0);
  };

  return (
    <Layout
      title="Mock API Call Validation"
      description={
        <>
          Target for the mock api call commands. Each request is sent only when
          its button is pressed, so a mock can be registered first. The status
          code, the saved value and the raw body are all shown, to tell a mocked
          response apart from a real one.
          <br />
          <br />
          API Base URL: {API_URL}
          <br />
          Note: the first real request may be slow because of cold start on
          Render hosting.
        </>
      }
    >
      <div className="mock-toolbar">
        <p className="mb-0">
          Requests sent:{" "}
          <strong id="requestCount" className="mock-counter">
            {requestCount}
          </strong>
        </p>
        <button
          className="btn-modern btn-primary"
          id="clearResults"
          onClick={clearResults}
        >
          Clear results
        </button>
      </div>

      <div className="api-card-grid">
        {scenarios.map((scenario) => {
          const result = results[scenario.id];
          const isPending = Boolean(pending[scenario.id]);

          return (
            <div className="modern-card" id={scenario.id} key={scenario.id}>
              <h2>{scenario.title}</h2>

              <p className="mock-endpoint">
                <span className="mock-method">{scenario.method}</span>
                <code>{scenario.path}</code>
              </p>

              <p className="mock-hint">{scenario.hint}</p>

              {scenario.body && (
                <pre className="mock-body mock-request-body">
                  {JSON.stringify(scenario.body, null, 2)}
                </pre>
              )}

              <button
                className="btn-modern btn-primary"
                id={`send-${scenario.id}`}
                onClick={() => sendRequest(scenario)}
                disabled={isPending}
              >
                {isPending
                  ? "Sending..."
                  : `Send ${scenario.method} ${scenario.path}`}
              </button>

              <div className="info-block mock-result">
                {!result ? (
                  <p className="mock-muted mb-0" id={`empty-${scenario.id}`}>
                    No request sent yet.
                  </p>
                ) : (
                  <>
                    <p className="mb-1">
                      Status:{" "}
                      <strong
                        id={`status-${scenario.id}`}
                        className={
                          result.reached && result.ok
                            ? "mock-status-ok"
                            : "mock-status-bad"
                        }
                      >
                        {result.reached
                          ? `${result.status} ${result.statusText}`.trim()
                          : "no response"}
                      </strong>
                    </p>
                    <p className="mb-1">
                      Saved value ({scenario.savedValuePath}):{" "}
                      <strong
                        id={`saved-${scenario.id}`}
                        className="mock-saved-value"
                      >
                        {result.savedValue ?? "not present in response"}
                      </strong>
                    </p>
                    <p className="mb-1">
                      Elapsed:{" "}
                      <strong id={`elapsed-${scenario.id}`}>
                        {result.elapsedMs} ms
                      </strong>
                    </p>
                    <p className="mb-1">
                      Request number:{" "}
                      <strong id={`attempt-${scenario.id}`}>
                        {result.attempt}
                      </strong>
                    </p>
                    <p className="mb-1">Response body:</p>
                    <pre id={`body-${scenario.id}`} className="mock-body">
                      {result.body}
                    </pre>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default MockApiPage;

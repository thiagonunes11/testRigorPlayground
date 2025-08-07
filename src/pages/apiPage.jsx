import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/homePage.css";

// API URL pointing to the hosted service
const API_URL = "https://tr-playground-api.onrender.com";

const ApiPage = () => {
  // GET /code
  const [code, setCode] = useState("");
  const [timestamp, setTimestamp] = useState(null);
  const [getError, setGetError] = useState("");

  // PUT /update
  const [putResponse, setPutResponse] = useState(null);

  // PATCH /modify
  const [patchBody, setPatchBody] = useState("");
  const [patchResponse, setPatchResponse] = useState(null);

  // DELETE /delete
  const [deleteResponse, setDeleteResponse] = useState(null);

  // Último POST recebido pelo backend
  const [lastPost, setLastPost] = useState(null);
  const [lastPostTimestamp, setLastPostTimestamp] = useState(null);

  // Último PUT recebido pelo backend
  const [lastPut, setLastPut] = useState(null);
  const [lastPutTimestamp, setLastPutTimestamp] = useState(null);

  // Último PATCH recebido pelo backend
  const [lastPatch, setLastPatch] = useState(null);
  const [lastPatchTimestamp, setLastPatchTimestamp] = useState(null);

  // Status de deleção
  const [isDeleted, setIsDeleted] = useState(false);
  const [lastDeleteTimestamp, setLastDeleteTimestamp] = useState(null);

  // GET /code on load
  useEffect(() => {
    fetch(`${API_URL}/code`)
      .then((res) => res.json())
      .then((data) => {
        setCode(data.code);
        setTimestamp(data.timestamp);
        setGetError("");
      })
      .catch(() => setGetError("Error fetching code."));

    // Reset delete status ao carregar a página
    fetch(`${API_URL}/reset-delete`);
  }, []);

  // Function to refresh code
  const handleGet = () => {
    fetch(`${API_URL}/code`)
      .then((res) => res.json())
      .then((data) => {
        setCode(data.code);
        setTimestamp(data.timestamp);
        setGetError("");
      })
      .catch(() => setGetError("Error fetching code."));
  };

  // Polling to fetch last POST received
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}/last-post`)
        .then((res) => res.json())
        .then((data) => {
          setLastPost(data.lastPost);
          setLastPostTimestamp(data.lastPostTimestamp);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Polling para buscar o último PUT recebido
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}/last-put`)
        .then((res) => res.json())
        .then((data) => {
          setLastPut(data.lastPut);
          setLastPutTimestamp(data.lastPutTimestamp);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Polling para buscar o último PATCH recebido
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}/last-patch`)
        .then((res) => res.json())
        .then((data) => {
          setLastPatch(data.lastPatch);
          setLastPatchTimestamp(data.lastPatchTimestamp);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Polling para verificar status de deleção
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}/last-delete`)
        .then((res) => res.json())
        .then((data) => {
          setIsDeleted(data.isDeleted);
          setLastDeleteTimestamp(data.lastDeleteTimestamp);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = () => {
    fetch(`${API_URL}/delete`, { method: "DELETE" })
      .then((res) => res.json())
      .then(setDeleteResponse)
      .catch(() => setDeleteResponse({ error: "Error sending DELETE." }));
  };

  return (
    <Layout
      title="API Validation for testRigor"
      description="Demonstration of GET, POST, PUT, PATCH, and DELETE calls to a local API."
    >
      <div className="api-card-grid">
        <div className="modern-card">
          <h2>GET /code</h2>
          <div className="info-block">
            <b>Current code:</b> <span className="code-value">{code}</span>
            {timestamp && (
              <span className="timestamp">
                ({new Date(timestamp).toLocaleString()})
              </span>
            )}
          </div>
          <button className="btn-modern btn-primary" onClick={handleGet}>
            Refresh code
          </button>
          {getError && <p className="error-msg">{getError}</p>}
        </div>
        <div className="modern-card">
          <h2>POST /echo</h2>
          <div className="info-block">
            <b>Last POST received by backend:</b>
            {lastPost ? (
              <pre>
                {JSON.stringify(lastPost, null, 2)}
                {lastPostTimestamp &&
                  `\n(${new Date(lastPostTimestamp).toLocaleString()})`}
              </pre>
            ) : (
              <p className="muted">No POST received yet.</p>
            )}
          </div>
        </div>
        <div className="modern-card">
          <h2>PUT /update</h2>
          <div className="info-block">
            <b>Last PUT received by backend:</b>
            {lastPut ? (
              <pre>
                {JSON.stringify(lastPut, null, 2)}
                {lastPutTimestamp &&
                  `\n(${new Date(lastPutTimestamp).toLocaleString()})`}
              </pre>
            ) : (
              <p className="muted">No PUT received yet.</p>
            )}
          </div>
        </div>
        <div className="modern-card">
          <h2>PATCH /modify</h2>
          <div className="info-block">
            <b>Last PATCH received by backend:</b>
            {lastPatch ? (
              <pre>
                {JSON.stringify(lastPatch, null, 2)}
                {lastPatchTimestamp &&
                  `\n(${new Date(lastPatchTimestamp).toLocaleString()})`}
              </pre>
            ) : (
              <p className="muted">No PATCH received yet.</p>
            )}
          </div>
        </div>
        <div className="modern-card">
          <h2>DELETE /delete</h2>
          <div className="info-block">
            <b>Test Element Status:</b>
            {!isDeleted ? (
              <div className="deletable-element">
                <p>✅ This element is visible and can be deleted</p>
                <p className="muted">
                  Send a DELETE request to remove this element
                </p>
              </div>
            ) : (
              <div className="deleted-element">
                <p>❌ This element has been deleted</p>
                <p className="muted">Reload the page to restore it</p>
                {lastDeleteTimestamp && (
                  <p className="timestamp">
                    Deleted at: {new Date(lastDeleteTimestamp).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>
          {/* Botão de delete removido */}
          {deleteResponse && (
            <pre>{JSON.stringify(deleteResponse, null, 2)}</pre>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ApiPage;

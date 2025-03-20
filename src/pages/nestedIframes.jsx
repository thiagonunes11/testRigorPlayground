import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap (if not added globally)


const NestedIframes = () => {
  return (
    <>
      {/* Navbar */}
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="../index.html">
              testRigor Playground
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mt-5">
        <div className="row justify-content-center text-center">
          <div className="col-6 border p-2">
            <h1 className="fs-2 fw-bold mt-3 mb-4">Nested Iframes</h1>
            <p>
              <small>
                There are two iframes, one inside another. Both of them have a
                unique word that is a link. This link changes the iframe url,
                changing also the text.
              </small>
            </p>
          </div>
        </div>

        {/* Iframe Section */}
        <div className="row mt-5">
          <div className="col">
            <h3>Out of iframe</h3>
            <p>
              This first test is present on the current page, outside of any
              iframe.
            </p>

            <iframe
              src={FirstIframe.jsx}
              id="firstIframe"
              title="First Nested Iframe"
              className="h-100 w-100"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>
    </>
  );
};

export default NestedIframes;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap if not globally added

const FirstIframe = () => {
  return (
    <main className="container m-3 bg-body-secondary">
      <div className="row">
        <div className="col">
          <p>
            But this text is inside the first iframe. Unique word:{" "}
            <a href="firstIframeSecret.html">tapioca</a>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <iframe
            src="secondIframe.html"
            id="secondIframe"
            title="First Nested Iframe"
            className="h-100 w-100"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </main>
  );
};

export default FirstIframe;

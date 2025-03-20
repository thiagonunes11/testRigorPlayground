import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap if not already included globally

const SecondIframe = () => {
  return (
    <main className="container m-3 bg-body-tertiary">
      <div className="row">
        <div className="col">
          <p>
            And this text is inside the second iframe. Unique link:{" "}
            <a href="secondIframeSecret.html">samba</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SecondIframe;

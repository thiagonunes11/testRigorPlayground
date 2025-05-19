import React from "react";
import SecondIframe from './secondIframe'; // Import the SecondIframe component

const FirstIframeSecret = () => {
  return (
    <main className="container m-3 bg-body-secondary">
      <div className="row">
        <div className="col">
          <p>You've clicked on the first iframe link!</p>
        </div>
      </div>

      <div className="row" style={{ height: '800px' }}> {/* Add a fixed height */}
          <div className="col h-100"> {/* Ensure the column takes full height */}
            {/* Render the SecondIframe component */}
            <iframe src="/nestedIframes/secondIframe" width="90%" height="40%">
            </iframe>
          </div>
        </div>
    </main>
  );
};

export default FirstIframeSecret;

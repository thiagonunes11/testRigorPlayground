import React from 'react';

const FirstIframe = () => {
  return (
    <div className="bg-body-secondary">
      <main className="container m-3">
        <div className="row">
          <div className="col">
            <p>
              But this text is inside the first iframe. Unique word:{' '}
              <a href="./firstIframeSecret">tapioca</a>
              
            </p>
          </div>
        </div>

        <div className="row" style={{ height: '500px' }}>
          <div className="col h-100">
            {/* Use iframe for isolation */}
            <iframe
              src="./secondIframe"
              title="Second Iframe"
              className="h-100 w-100"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FirstIframe;
import React from 'react';

const SecondIframe = () => {
  return (
    <div className="bg-body-tertiary h-100">
      <main className="container m-3 h-100">
        <div className="row h-100">
          <div className="col">
            <p>
              And this text is inside the second iframe. Unique link:{' '}
              <a href="./secondIframeSecret">samba</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SecondIframe;
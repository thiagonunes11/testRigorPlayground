import React from 'react';
import FirstIframe from './nestedIframes/firstIframe'; // Import the FirstIframe component
import Demo from '../components/Demo.jsx';

const NestedIframes = () => {
  return (
    <Layout
      title={"Nested Iframes"}
      description={"There are two iframes, one inside another. Both of them have a unique word that is a link. This link changes the iframe url, changing also the text."}
    >

      <main className="container mt-5">
        <div className="row mt-5">
          <div className="col">
            <h3>Out of iframe</h3>
            <p>This first test is present on the current page, outside of any iframe.</p>

            {/* Replace iframe with the FirstIframe component */}
            <iframe src="http://localhost:5173/nestedIframes/firstIframe" width="1000px" height="800px">
            </iframe>

          </div>
        </div>
      </main>
    </Layout>
  );
};

export default NestedIframes;
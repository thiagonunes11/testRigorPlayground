import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap if not already included globally
import Layout from '../components/Layout';
const Regex = () => {
  return (
    <Layout
      title="RegEx"
      description="Use RegEx to search for patterns on the page."
    >
      {/* Country Information */}
      <div className="row mt-5 justify-content-center text-center">
        <div className="col">
          {/* Argentina */}
          <div>
            <h3>Argentina</h3>
            <p>Website: www.argentina.gob.ar</p>
            <p>Phone pattern: +54 (11) 4124-7200</p>
            <p>ZIP Code: C1091AAZ</p>
          </div>

          {/* Brazil */}
          <div>
            <h3>Brazil</h3>
            <p>Website: www.gov.br</p>
            <p>Phone pattern: +55 (61) 2024-2287</p>
            <p>ZIP Code: 70.068-900</p>
          </div>

          {/* Germany */}
          <div>
            <h3>Germany</h3>
            <p>Website: www.bundesregierung.de</p>
            <p>Phone pattern: +49 303 0185800</p>
            <p>ZIP Code: 11015 Berlin</p>
          </div>

          {/* Italy */}
          <div>
            <h3>Italy</h3>
            <p>Website: www.governo.it</p>
            <p>Phone pattern: +39 066 7235000</p>
            <p>ZIP Code: 00917 Roma</p>
          </div>

          {/* United States */}
          <div>
            <h3>United States</h3>
            <p>Website: www.usa.gov</p>
            <p>Phone pattern: +1 (202) 707-3000</p>
            <p>ZIP Code: 20559-6000</p>
          </div>
        </div>
      </div>
    </Layout>

  );
};

export default Regex;

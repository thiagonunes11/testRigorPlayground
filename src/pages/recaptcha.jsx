import { useState, useEffect } from "react";
import Layout from '../components/Layout';
import '../styles/homePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Recaptcha = () => {
  const [captchaToken, setCaptchaToken] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Define callback function for reCAPTCHA
    window.onRecaptchaSuccess = (token) => {
      setCaptchaToken(token);
      setMessage("");
    };

    return () => {
      // Cleanup
      document.body.removeChild(script);
      delete window.onRecaptchaSuccess;
    };
  }, []);

  const handleValidate = (e) => {
    e.preventDefault();
    
    if (captchaToken) {
      setMessage("✓ Captcha validation successful!");
      setMessageType("success");
    } else {
      setMessage("✗ Please complete the reCAPTCHA challenge first.");
      setMessageType("error");
    }
  };

  const handleReset = () => {
    setCaptchaToken(null);
    setMessage("");
    setMessageType("");
    
    // Reset reCAPTCHA widget
    if (window.grecaptcha) {
      window.grecaptcha.reset();
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="card-title text-center mb-4">Test reCAPTCHA </h2>
                <p className="text-center text-muted mb-4">
                  Complete the reCAPTCHA challenge below and click validate to test the verification.
                </p>

                <form onSubmit={handleValidate}>
                  <div className="d-flex justify-content-center mb-4">
                    <div 
                      className="g-recaptcha" 
                      data-sitekey="6LeE8xgsAAAAAGI02brh3TKXGpvbLF9yNUVQDu5K"
                      data-callback="onRecaptchaSuccess"
                    ></div>
                  </div>

                  {message && (
                    <div 
                      className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'} text-center`}
                      role="alert"
                      data-testid="validation-message"
                    >
                      {message}
                    </div>
                  )}

                  <div className="d-flex gap-3 justify-content-center">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg"
                      data-testid="validate-button"
                    >
                      Validate
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-lg"
                      onClick={handleReset}
                      data-testid="reset-button"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Recaptcha;

import { useState } from "react";
import Layout from '../components/Layout';
import '../styles/homePage.css';
import '../styles/form.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RequiredForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    tier: '',
    contactMethod: '',
    comments: '',
    agreeTerms: false,
  });

  const [showResult, setShowResult] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      tier: '',
      contactMethod: '',
      comments: '',
      agreeTerms: false,
    });
    setShowResult(false);
  };

  return (
    <Layout
      title={"Required Fields Form"}
      description={"Form with various required fields and HTML5 validation."}
    >
      <div className="row mt-5 justify-content-center text-center">
        {!showResult && (
          <div className="col-12 col-md-10 col-lg-8 border px-4 py-4 rounded-custom">
            <form onSubmit={handleSubmit} className="form-container">

              {/* Full Name - Text Input */}
              <div className="form-group mb-4">
                <label className="form-label d-block text-start" htmlFor="fullName">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email Address - Email Input */}
              <div className="form-group mb-4">
                <label className="form-label d-block text-start" htmlFor="email">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              {/* Password - Password Input */}
              <div className="form-group mb-4">
                <label className="form-label d-block text-start" htmlFor="password">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter a secure password"
                  required
                />
              </div>

              <hr className="my-4 border-top border-secondary" />

              {/* Service Tier - Select Dropdown */}
              <div className="form-group mb-4">
                <label className="form-label d-block text-start" htmlFor="tier">
                  Service Tier <span className="text-danger">*</span>
                </label>
                <select
                  id="tier"
                  className="form-control"
                  name="tier"
                  value={formData.tier}
                  onChange={handleChange}
                >
                  <option value="">Select a tier...</option>
                  <option value="free">Free - Basic features</option>
                  <option value="pro">Pro - $15/month</option>
                  <option value="enterprise">Enterprise - Contact sales</option>
                </select>
              </div>

              {/* Contact Method - Radio Buttons */}
              <div className="mb-4 text-start">
                <label className="form-label">
                  Preferred Contact Method <span className="text-danger">*</span>
                </label>

                <div className="form-check">
                  <input
                    id="contactEmail"
                    type="checkbox"
                    name="contactMethod"
                    className="form-check-input"
                    value="email"
                    checked={formData.contactMethod}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="contactEmail">
                    Email
                  </label>
                </div>

                <div className="form-check">
                  <input
                    id="contactPhone"
                    type="checkbox"
                    name="contactMethod"
                    className="form-check-input"
                    value="phone"
                    checked={formData.contactMethod}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="contactPhone">
                    Phone
                  </label>
                </div>

                <div className="form-check">
                  <input
                    id="contactNone"
                    type="checkbox"
                    name="contactMethod"
                    className="form-check-input"
                    value="none"
                    checked={formData.contactMethod}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="contactNone">
                    Do not contact me
                  </label>
                </div>
              </div>

              <hr className="my-4 border-top border-secondary" />

              {/* Message/Comments - Textarea */}
              <div className="form-group mb-4">
                <label className="form-label d-block text-start" htmlFor="comments">
                  Comments / Message <span className="text-danger">*</span>
                </label>
                <textarea
                  id="comments"
                  className="form-control"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Tell us why you are signing up..."
                  rows={4}
                  required
                />
              </div>

              {/* Terms of Service - Checkbox */}
              <div className="mb-4 text-start">
                <div className="form-check">
                  <input
                    id="agreeTerms"
                    type="checkbox"
                    name="agreeTerms"
                    className="form-check-input"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="agreeTerms">
                    I agree to the Terms of Service and Privacy Policy <span className="text-danger">*</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-success mt-3" id="submitBtn">Submit</button>
            </form>
          </div>
        )}

        {showResult && (
          <div className="col-12 col-md-10 col-lg-8">
            <div className="result-box text-start mt-5 p-4 rounded" id="resultBox">
              <h4 className="mb-4 text-success">Form Submitted Successfully!</h4>
              <p><strong>Full Name:</strong> <span id="resFullName">{formData.fullName}</span></p>
              <p><strong>Email:</strong> <span id="resEmail">{formData.email}</span></p>
              <p><strong>Password:</strong> <span id="resPassword">••••••••</span> (Hidden for security)</p>
              <p><strong>Service Tier:</strong> <span id="resTier">{formData.tier}</span></p>
              <p><strong>Contact Method:</strong> <span id="resContactMethod">{formData.contactMethod}</span></p>
              <p><strong>Comments:</strong> <span id="resComments">{formData.comments}</span></p>
              <p><strong>Agreed to Terms:</strong> <span id="resAgreeTerms">{formData.agreeTerms ? "Yes" : "No"}</span></p>

              <button onClick={handleReset} className="btn btn-primary mt-4" id="resetBtn">
                Fill Again
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RequiredForm;

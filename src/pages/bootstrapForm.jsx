import { useState } from "react";
import { PhoneInput } from 'react-international-phone';
import Layout from '../components/Layout';
import 'react-international-phone/style.css';
import '../styles/homePage.css';
import '../styles/bootstrapForm.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const BootstrapForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    color: '',
    country: 'USA',
    checkboxes: {
      better_call_saul: false,
      drop_the_phone: false,
      wazzzup: false,
    },
    optionsRadios: 'ONE',
    phone: '',
  });

  const [text, setText] = useState('');
  const [name] = useState('');
  const [showWelcome] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        checkboxes: {
          ...formData.checkboxes,
          [name]: checked,
        },
      });
    } else if (type === 'radio') {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <Layout
      title={"Bootstrap form"}
      description={"Example form with various input types using Bootstrap styling."}
    >
      <div className="row mt-5 justify-content-center text-center">
        {showWelcome && (
          <p id="welcomeText">
            Welcome, <span id="nameText">{name}</span>
          </p>
        )}

        {!showResult && (
          <div className="col-12 col-md-10 col-lg-8 border px-4 py-4 rounded-custom">
            <form onSubmit={handleSubmit} className="form-container">

              <div className="form-group mb-4">
                <label className="form-label d-block text-start">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label d-block text-start">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>

              <hr className="my-4 border-top border-secondary" />

              <div className="form-group mb-4">
                <label className="form-label d-block text-start">Read Only</label>
                <input
                  type="text"
                  className="form-control"
                  value="This value must be the same"
                  readOnly
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label d-block text-start">Description</label>
                <textarea
                  className="form-control"
                  value={text}
                  onChange={handleTextChange}
                  rows={5}
                />
              </div>

              <hr className="my-4 border-top border-secondary" />

              <div className="form-group mb-4">
                <label className="form-label d-block text-start">My Notes</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Middle control"
                />

                <input
                  type="text"
                  className="form-control borderless-input"
                  placeholder="Enter here"
                />
              </div>

              <hr className="my-4 border-top border-secondary" />

              <div className="form-group mb-4">
                <label className="form-label d-block text-start">Phone</label>
                <div className="form-control phone-wrapper">
                  <PhoneInput
                    value={formData.phone}
                    onChange={(phone) => setFormData({ ...formData, phone })}
                    defaultCountry="us"
                    placeholder="(201) 555-0123"
                    className="w-100"
                  />
                </div>
              </div>

              <hr className="my-4 border-top border-secondary" />

              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Middle control 2"
                />

                <input
                  type="text"
                  className="form-control borderless-input"
                  placeholder="Enter you here"
                />
              </div>

              <hr className="my-4 border-top border-secondary" />

              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Middle control3"
                />

                <input
                  type="text"
                  className="form-control borderless-input"
                  placeholder="Enter they here"
                />
              </div>

              <hr className="my-4 border-top border-secondary" />

              <div className="form-group mb-4">
                <label className="form-label d-block text-start">Your preferred color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Green"
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label d-block text-start">Country</label>
                <select
                  className="form-control"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}>
                  <option>USA</option>
                  <option>Germany</option>
                  <option>Brazil</option>
                  <option>Russia</option>
                </select>
              </div>

              <hr className="my-4 border-top border-secondary" />

              <div className="mb-3 text-start">
                <label className="form-label">Select your interests:</label>

                <div className="form-check">
                  <input
                    type="checkbox"
                    name="better_call_saul"
                    className="form-check-input"
                    checked={formData.checkboxes.better_call_saul}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Better call Saul</label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    name="drop_the_phone"
                    className="form-check-input"
                    checked={formData.checkboxes.drop_the_phone}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Drop the phone</label>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    name="wazzzup"
                    className="form-check-input"
                    checked={formData.checkboxes.wazzzup}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Wazzzup!</label>
                </div>
              </div>

              <hr className="my-4 border-top border-secondary" />

              <div className="mb-4 text-start">
                <label className="form-label">Choose an option:</label>

                <div className="form-check">
                  <input
                    type="radio"
                    name="optionsRadios"
                    className="form-check-input"
                    value="ONE"
                    checked={formData.optionsRadios === 'ONE'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Option one is this and that</label>
                </div>

                <div className="form-check">
                  <input
                    type="radio"
                    name="optionsRadios"
                    className="form-check-input"
                    value="TWO"
                    checked={formData.optionsRadios === 'TWO'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Option two can be something else and selecting it will deselect option one</label>
                </div>

                <div className="form-check">
                  <input
                    type="radio"
                    name="optionsRadios"
                    className="form-check-input"
                    value="THREE"
                    checked={formData.optionsRadios === 'THREE'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Option three is about me</label>
                </div>
              </div>

              <button type="submit" className="btn btn-success mt-3">Submit</button>
            </form>
          </div>
        )}

        {showResult && (
          <div className="col-12 col-md-10 col-lg-8">
            <div className="result-box text-start mt-5 p-4 rounded">
              <p><strong>email:</strong> {formData.email || 'no value'}</p>
              <p><strong>password:</strong> {formData.password || 'no value'}</p>
              <p><strong>ro:</strong> This value must be the same</p>
              <p><strong>desc:</strong> {text || 'no value'}</p>
              <p><strong>color:</strong> {formData.color || 'no value'}</p>
              <p><strong>country:</strong> {formData.country}</p>
              <p><strong>optionsRadios:</strong> {formData.optionsRadios}</p>

              {Object.values(formData.checkboxes).some(v => v) && (
                <>
                  <p><strong>checkboxes:</strong></p>
                  {formData.checkboxes.better_call_saul && <p>better_call_saul: checked</p>}
                  {formData.checkboxes.drop_the_phone && <p>drop_the_phone: checked</p>}
                  {formData.checkboxes.wazzzup && <p>wazzzup: checked</p>}
                </>
              )}

              <p><strong>phone:</strong> {formData.phone || 'no value'}</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BootstrapForm;
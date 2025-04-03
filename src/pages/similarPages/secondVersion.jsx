import React, { useState } from "react";
import Demo from "../../components/Demo.jsx";

function SecondVersion() {
  const [author, setAuthor] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSearch = () => {
    if (author.trim() !== "") {
      setShowResult(true);
    }
  };

  return (
    <Demo>
    <div>

        <div className="row justify-content-center text-center mb-5">
          <div className="col-6 border p-2">
            <h1 className="fs-2 fw-bold mt-3 mb-4">Similar Pages</h1>
            <p>
              <small>
                There are two nearly identical pages that differ only in tags or attributes.
              </small>
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="card text-center">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <a className="nav-link" href="../similarPages">First version</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" aria-disabled="true">Second version</a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">Check by the author</h5>
                <p className="card-text" title="Enter the name into the field!">
                  Here you can check if our library has a book by the author's name.
                </p>

                <div className="row justify-content-center my-5">
                  <div className="col-8">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Author's name"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                      <button className="btn btn-outline-primary" type="button" data-qa="search-button" onClick={handleSearch}>
                        Search
                      </button>
                    </div>
                  </div>
                </div>

                {showResult && (
                  <div className="alert alert-success" role="alert">
                    A book by <span>{author}</span> was found!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
    </Demo>
  );
}

export default SecondVersion;

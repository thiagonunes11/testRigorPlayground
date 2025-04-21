import React, { useState } from "react";
import Layout from '../components/Layout';
function SimilarPages() {
  const [author, setAuthor] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSearch = () => {
    if (author.trim() !== "") {
      setShowResult(true);
    }
  };

  return (
    <Layout
      title="Similar Pages"
      description="There are two nearly identical pages that differ only in tags or attributes."
    >
      <div>
        <main className="container mt-5">
          {/* Search Section */}
          <div className="row justify-content-center">
            <div className="col-6">
              <div className="card text-center">
                <div className="card-header">
                  <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="true">First version</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="similarPages/secondVersion">Second version</a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Check by the author</h5>
                  <p className="card-text">Here you can check if our library has a book by the author's name.</p>

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
                        <button className="btn btn-outline-primary" type="button" onClick={handleSearch}>
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
        </main>
      </div>
    </Layout>
  );
}

export default SimilarPages;

import React from "react";
import Layout from "../../components/Layout";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/deeplinkNavigation.css";

function DeeplinkStep({ currentPage, nextPath, nextLabel, isLast = false }) {
  return (
    <Layout
      title="Deeplink Navigation"
      description="Navigate through five pages using direct URL links."
    >
      <div className="demo-content text-center">
        <p className="mb-4" id="pageIndicator">
          Page {currentPage} of 5
        </p>

        {!isLast ? (
          <Button
            as={Link}
            to={nextPath}
            variant="primary"
            className="deeplink-nav-button btn-modern w-100 w-md-auto"
            id="nextPageButton"
          >
            {nextLabel}
          </Button>
        ) : (
          <p className="text-secondary mb-0" id="completionMessage">
            You have reached the final page.
          </p>
        )}
      </div>
    </Layout>
  );
}

export default DeeplinkStep;

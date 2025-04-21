import React, { useState } from "react";
import Prompt from '../components/Prompt.jsx'
import Layout from '../components/Layout'; import { Link } from "react-router-dom";

function NewTab() {
    return (
        <Layout
            title="Open new tab"
            description="Click the link that will open a new tab."
        >
            <div className="row mt-5">
                <div className="col-12">
                    Hello! This is a page that was opened in a new tab.
                </div>
            </div>
        </Layout>
    );
}

export default NewTab;
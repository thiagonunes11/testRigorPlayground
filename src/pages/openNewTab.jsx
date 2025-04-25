import React, { useState } from "react";
import Prompt from '../components/Prompt.jsx'
import Layout from '../components/Layout'; import { Link } from "react-router-dom";

function OpenNewTab() {
    return (
        <Layout
            title="Open new tab"
            description="Click the link that will open a new tab."
        >

            <div className="row mt-5">
                <div className="col-12">
                    <Link to="/newTab" target="_blank">Open new tab</Link>
                </div>
            </div>
        </Layout>
    );
}

export default OpenNewTab;
import React, { useState } from "react";
import Prompt from '../components/Prompt.jsx'
import Demo from "../components/Demo.jsx";
import { Link } from "react-router-dom";

function OpenNewTab() {
    return (
        <Demo>
            <Prompt title="Open new tab" instructions="Click the link that will open a new tab."/>

            <div className="row mt-5">
                <div className="col-12">
                    <Link to="/newTab" target="_blank">Open new tab</Link>
                </div>
            </div>
        </Demo>
    );
}

export default OpenNewTab;
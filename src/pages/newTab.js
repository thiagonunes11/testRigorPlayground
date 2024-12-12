import React, { useState } from "react";
import Prompt from '../components/Prompt.js'
import Demo from "../components/Demo.js";
import { Link } from "react-router-dom";

function NewTab() {
    return (
        <Demo>
            <Prompt title="Open new tab" instructions="Click the link that will open a new tab."/>
            
            <div className="row mt-5">
                <div className="col-12">
                    Hello! This is a page that was opened in a new tab.
                </div>
            </div>
        </Demo>
    );
}

export default NewTab;
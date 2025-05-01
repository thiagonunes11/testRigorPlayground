import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';


const WaitMessage = () => {
    useEffect(() => {
        let counter = 5;

        function callTimeout() {
            document.getElementById("counter").innerHTML = counter;

            if (counter > 0) {
                counter--;
                setTimeout(callTimeout, 1000);
            } else {
                document.getElementById("secretMessage").hidden = false;
            }
        }

        callTimeout();
    }, []);

    return (
        <Layout title="Wait for the Message" 
                description="In five seconds, the message will appear."
        >
            <div className="row justify-content-center text-center">
                <div className="col-6 border p-2 pt-4">
                    <h1 className="fs-2 fw-bold">Wait for the Message</h1>
                    <p><small>In five seconds, the message will appear.</small></p>
                </div>
            </div>

            <div className="row mt-5 justify-content-center text-center">
                <h3>The secret message will appear in <span id="counter">3</span>...</h3>

                <div className="col-4 mt-3">
                    <div id="secretMessage" className="alert alert-success pb-0" role="alert" hidden>
                        <p>The secret message is: banana</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default WaitMessage;
import React from 'react';
import Demo from "../components/Demo.jsx";
import AudioA from "../assets/344211_giomilko_c-major-9-bossa-nova-guitar.wav"
import AudioB from "../assets/53704_reinsamba_samba-batucada1.wav"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AudioValidation = () => {
    return (
        <Demo>

      
                <div className="row justify-content-center text-center text-break">
                    <div className="col-6 border p-2 pt-4">
                        <h1 className="fs-2 fw-bold">Audio Validation</h1>
                        <p>
                            <small>
                                Both audios present URLs that can be saved.
                                Each audio can be recorded through the playback controls and validated that it does or does not match saved files or other recordings.<br/>
                            </small>
                        </p>
                    </div>
                </div>

                <div className="row mt-5 justify-content-center text-center">
                    <div className="row mt-5">
                        <div className="col">
                            <h3>Audio A</h3>
                            <audio controls id="audioA" src={AudioA} type="audio/wav"></audio><br/>
                            <a href="../assets/344211_giomilko_c-major-9-bossa-nova-guitar.wav">Audio URL</a> | <a href="https://commons.wikimedia.org/wiki/File:344211_giomilko_c-major-9-bossa-nova-guitar.wav">Attribution</a>
                        </div>
                        <div className="col">
                            <h3>Audio B</h3>
                            <audio controls id="audioB" src={AudioB} type="audio/wav"></audio><br/>
                            <a href="../assets/53704_reinsamba_samba-batucada1.wav">Audio URL</a> | <a href="https://commons.wikimedia.org/wiki/File:53704_reinsamba_samba-batucada1.wav">Attribution</a>
                        </div>
                    </div>
                </div>

        </Demo>
    );
};

export default AudioValidation;
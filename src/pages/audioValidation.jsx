import React from 'react';
import { Card } from 'react-bootstrap';
import Layout from '../components/Layout';
import '../styles/homePage.css';
import AudioA from "../assets/344211_giomilko_c-major-9-bossa-nova-guitar.wav"
import AudioB from "../assets/53704_reinsamba_samba-batucada1.wav"
import 'bootstrap/dist/css/bootstrap.min.css';

const AudioValidation = () => {
    return (
        <Layout 
            title="Audio Validation" 
            description="Validate audio playback functionality."
        >
            <div className="demo-content">
                <div className="audio-validation-container">
                    <div className="page-header mb-4">
                        <h1 className="page-title">Audio Playback Test</h1>
                        <p className="page-description">
                            Test the audio playback functionality by playing the sample audio files below.
                        </p>
                    </div>

                    <div className="modern-card">
                        <div className="audio-samples">
                            <div className="card-body">
                                <div className="mb-4">
                                    <h4 className="card-subtitle mb-3">Sample A</h4>
                                    <audio 
                                        controls 
                                        src={AudioA} 
                                        className="audio-player w-100"
                                    />
                                </div>
                                <div>
                                    <h4 className="card-subtitle mb-3">Sample B</h4>
                                    <audio 
                                        controls 
                                        src={AudioB} 
                                        className="audio-player w-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AudioValidation;
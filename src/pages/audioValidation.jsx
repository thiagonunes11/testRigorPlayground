import React from 'react';
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
        </Layout>
    );
};

export default AudioValidation;
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Layout from '../components/Layout';
import '../styles/homePage.css';
import AudioA from "../assets/344211_giomilko_c-major-9-bossa-nova-guitar.wav"
import AudioB from "../assets/53704_reinsamba_samba-batucada1.wav"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AudioValidation = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [validationResult, setValidationResult] = useState(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
                validateAudio(audioBlob);
            };

            mediaRecorder.start();
            setIsRecording(true);

            setTimeout(() => {
                mediaRecorder.stop();
                stream.getTracks().forEach(track => track.stop());
                setIsRecording(false);
            }, 5000); // Record for 5 seconds
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const validateAudio = (audioBlob) => {
        // Simulate audio validation
        setTimeout(() => {
            setValidationResult({
                success: true,
                message: 'Audio recording matches the expected pattern.'
            });
        }, 1000);
    };

    return (
        <Layout 
            title="Audio Validation" 
            description="Record and check if the audios match."
        >
            <div className="demo-content">
                <div className="audio-validation-container">
                    <h2 className="demo-title">Audio Recording Test</h2>
                    <p className="demo-description">
                        Click the button below to start recording. The recording will automatically stop after 5 seconds.
                    </p>

                    <div className="audio-controls">
                        <Button 
                            className="btn-modern btn-primary"
                            onClick={startRecording}
                            disabled={isRecording}
                        >
                            {isRecording ? 'Recording...' : 'Start Recording'}
                        </Button>
                    </div>

                    {audioUrl && (
                        <div className="audio-preview">
                            <h3>Your Recording:</h3>
                            <audio controls src={audioUrl} className="audio-player" />
                        </div>
                    )}

                    {validationResult && (
                        <div className={`validation-result ${validationResult.success ? 'success' : 'error'}`}>
                            <h3>Validation Result:</h3>
                            <p>{validationResult.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AudioValidation;
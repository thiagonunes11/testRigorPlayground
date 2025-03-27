import React, { useState, useEffect, useRef } from 'react';
import Demo from '../components/Demo.jsx';

const CameraPage = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });
      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraOn(true);
      setError(null);
    } catch (err) {
      setError(`Error accessing camera: ${err.message}`);
      setIsCameraOn(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
    }
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  useEffect(() => {
    // Start camera on initial mount
    startCamera();

    return () => {
      // Cleanup on unmount
      stopCamera();
    };
  }, []);

  return (
    <Demo>
      <div className="camera-container">
        <h2>Camera Access</h2>
        {!isCameraOn && !error && <p>Camera is currently off</p>}
        <button onClick={toggleCamera}>
          {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
        </button>
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ display: isCameraOn ? 'block' : 'none', width: '100%' }}
          />
        )}
      </div>
    </Demo>
  );
};

export default CameraPage;
import React, { useState, useEffect, useRef } from 'react';
import Demo from '../components/Demo.jsx';

const CameraPage = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    let stream = null;

    const enableStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setHasPermission(true);
        stream = mediaStream;
      } catch (err) {
        setError(`Error accessing camera: ${err.message}`);
      }
    };

    if (!hasPermission) {
      enableStream();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [hasPermission]);

  const toggleCamera = async () => {
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setHasPermission(false);
    } else {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        videoRef.current.srcObject = mediaStream;
        setHasPermission(true);
      } catch (err) {
        setError(`Error accessing camera: ${err.message}`);
      }
    }
  };

  return (
    <Demo>
    <div className="camera-container">
      <h2>Camera Access</h2>
      {!hasPermission && <p>Requesting camera access...</p>}
          <button onClick={toggleCamera}>
            {hasPermission ? 'Turn Off Camera' : 'Turn On Camera'}
          </button>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ display: hasPermission ? 'block' : 'none', width: '100%' }}
          />
 
        </>
      )}
    </div>
    </Demo>
  );
};

export default CameraPage;
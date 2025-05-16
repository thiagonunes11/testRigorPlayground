import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { Button } from 'react-bootstrap';

const CameraPage = () => {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState(null);

  const toggleCamera = async () => {
    if (isCameraOn) {
      // Stop camera
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
    } else {
      // Start camera
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
        setError(null);
      } catch (err) {
        setError(`Error accessing camera: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <Layout title="Camera" description="Validate the usage of the camera.">
      <div className="demo-content text-center">
        <Button className="btn-modern btn-primary mb-4" onClick={toggleCamera}>
          {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
        </Button>
        {error && <div className="error">{error}</div>}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ display: isCameraOn ? 'block' : 'none', width: '100%' }}
        />
        {!isCameraOn && !error && <p>Camera is currently off</p>}
      </div>
    </Layout>
  );
};

export default CameraPage;
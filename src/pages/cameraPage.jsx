import { useState, useRef, useEffect } from 'react';
import "../styles/cameraPage.css";
import Demo from '../components/Demo.jsx';

const CameraPage = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState('user'); // 'user' or 'environment'

  // Start the camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setHasPermission(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access the camera. Please check permissions.");
    }
  };

  // Stop the camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setHasPermission(false);
  };

  // Take a photo
  const takePhoto = () => {
    const video = videoRef.current;
    const photo = photoRef.current;
    
    const width = video.videoWidth;
    const height = video.videoHeight;
    
    photo.width = width;
    photo.height = height;
    
    const ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    
    setPhotoTaken(true);
  };

  // Retake photo
  const retakePhoto = () => {
    setPhotoTaken(false);
  };

  // Download photo
  const downloadPhoto = () => {
    const photo = photoRef.current;
    const link = document.createElement('a');
    link.download = 'photo.png';
    link.href = photo.toDataURL('image/png');
    link.click();
  };

  // Toggle between front and back camera
  const toggleCamera = () => {
    stopCamera();
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Start camera when facingMode changes
  useEffect(() => {
    if (hasPermission) {
      startCamera();
    }
  }, [facingMode]);

  return (
    <Demo className="camera-page">
      <h1>Camera App</h1>
      
      {!hasPermission ? (
        <button onClick={startCamera} className="camera-button">
          Start Camera
        </button>
      ) : (
        <>
          <div className="camera-container">
            {!photoTaken ? (
              <video ref={videoRef} autoPlay playsInline className="camera-feed" />
            ) : (
              <canvas ref={photoRef} className="photo-preview" />
            )}
          </div>
          
          <div className="camera-controls">
            {!photoTaken ? (
              <>
                <button onClick={takePhoto} className="capture-button">
                  Take Photo
                </button>
                <button onClick={toggleCamera} className="switch-button">
                  Switch Camera
                </button>
              </>
            ) : (
              <>
                <button onClick={retakePhoto} className="retake-button">
                  Retake
                </button>
                <button onClick={downloadPhoto} className="download-button">
                  Download
                </button>
              </>
            )}
            <button onClick={stopCamera} className="stop-button">
              Stop Camera
            </button>
          </div>
        </>
      )}
    </Demo>
  );
};

export default CameraPage;
import React, { useState, useRef } from 'react';
import bunnyVideo from "../assets/bunny.mp4"
import Demo from '../components/Demo.jsx';
const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  const playVideo = () => {
    videoRef.current.play();
    setIsVisible(true);
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <Demo>
    <main className="container text-center mt-5">
      <div className="row justify-content-center">
        <div className="col-6 border p-2 pt-4">
          <h1 className="fs-2 fw-bold">Video Playback</h1>
          <p><small>Click the Play button to start playing a video.</small></p>
        </div>
      </div>
      <div className="row mt-5 justify-content-center">
        <div className="col-6 d-flex flex-column align-items-center">
          <div className="mb-3">
            {!isPlaying ? (
              <button 
                className="btn btn-primary"
                onClick={playVideo}
              >
                Play
              </button>
            ) : (
              <button 
                className="btn btn-secondary"
                onClick={pauseVideo}
              >
                Pause
              </button>
            )}
          </div>
          <video
            ref={videoRef}
            className="mt-3"
            loop
            style={{ width: '100%', visibility: isVisible ? 'visible' : 'hidden' }}
            onPlay={handlePlay}
            onPause={handlePause}
          >
            <source src={bunnyVideo} type="video/mp4" />
          </video>
        </div>
      </div>
    </main>
    </Demo>
  );
};

export default VideoPlayer;
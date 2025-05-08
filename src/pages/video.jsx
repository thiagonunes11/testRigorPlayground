import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import bunnyVideo from "../assets/bunny.mp4";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Layout title="Video Playback" description="Play or pause the video below.">
      <div className="text-center mt-5">
        <button
          className={`btn btn-${isPlaying ? 'secondary' : 'primary'} px-4 mb-3`}
          onClick={togglePlayback}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="mx-auto" style={{ maxWidth: '600px' }}>
          <video
            ref={videoRef}
            className="rounded shadow-sm w-100"
            loop
            controls
            playsInline
          >
            <source src={bunnyVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </Layout>
  );
};

export default VideoPlayer;
import React from 'react';
import Layout from '../components/Layout';
import bunnyVideo from "../assets/bunny.mp4";

const VideoPlayer = () => {
  return (
    <Layout title="Video Playback" description="Click the video to play it.">
      <div className="text-center mt-5">
        <div className="mx-auto" style={{ maxWidth: '600px' }}>
          <video
            className="rounded shadow-sm w-100"
            loop
            controls
            playsInline
            aria-label="Video Player"
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
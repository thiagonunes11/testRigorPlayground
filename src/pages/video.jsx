import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import bunnyVideo from "../assets/bunny.mp4";
import Layout from '../components/Layout';


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
    <Layout
      title="Video Playback"
      description="Click the Play button to start playing a video."
    >
      <Container className="text-center mt-3 mt-md-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className="border p-2 p-md-3 pt-3 pt-md-4">
            <h1 className="fs-3 fs-md-2 fw-bold mb-2 mb-md-3">Video Playback</h1>
            <p className="mb-0"><small>Click the Play button to start playing a video.</small></p>
          </Col>
        </Row>

        <Row className="mt-4 mt-md-5 justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} className="d-flex flex-column align-items-center">
            <div className="mb-3">
              {!isPlaying ? (
                <Button 
                  variant="primary"
                  size="lg"
                  onClick={playVideo}
                  className="px-4"
                >
                  Play
                </Button>
              ) : (
                <Button 
                  variant="secondary"
                  size="lg"
                  onClick={pauseVideo}
                  className="px-4"
                >
                  Pause
                </Button>
              )}
            </div>
            
            <div className="w-100" style={{ maxWidth: '600px' }}>
              <video
                ref={videoRef}
                className="mt-3 rounded shadow-sm w-100"
                loop
                style={{ visibility: isVisible ? 'visible' : 'hidden' }}
                onPlay={handlePlay}
                onPause={handlePause}
                playsInline
              >
                <source src={bunnyVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </Col>
        </Row>
      </Container>
      <br> </br>
      <br> </br>
    </Layout>
  );
};

export default VideoPlayer;
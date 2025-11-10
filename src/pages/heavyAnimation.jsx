import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import '../styles/heavyAnimation.css';

const HeavyAnimation = () => {
    const [particles, setParticles] = useState([]);
    const [rotatingBoxes, setRotatingBoxes] = useState([]);
    const [pulsingCircles, setPulsingCircles] = useState([]);
    const [bouncingBalls, setBouncingBalls] = useState([]);
    const [explosions, setExplosions] = useState([]);
    const [trails, setTrails] = useState([]);
    const [isRunning, setIsRunning] = useState(true);
    const [counter, setCounter] = useState(0);
    const [fps, setFps] = useState(60);
    const canvasRef = useRef(null);
    const animationFrameRef = useRef(null);
    const lastFrameTimeRef = useRef(Date.now());

    useEffect(() => {
        // Generate 200 particles (increased from 50)
        const particleArray = Array.from({ length: 200 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 30 + 5,
            delay: Math.random() * 5,
            duration: Math.random() * 2 + 1
        }));
        setParticles(particleArray);

        // Generate 100 rotating boxes (increased from 30)
        const boxArray = Array.from({ length: 100 }, (_, i) => ({
            id: i,
            x: (i % 10) * 10,
            y: Math.floor(i / 10) * 10,
            delay: Math.random() * 2,
            hue: Math.random() * 360
        }));
        setRotatingBoxes(boxArray);

        // Generate 150 pulsing circles (increased from 40)
        const circleArray = Array.from({ length: 150 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 3,
            scale: Math.random() + 0.5
        }));
        setPulsingCircles(circleArray);

        // Generate 80 bouncing balls (increased from 25)
        const ballArray = Array.from({ length: 80 }, (_, i) => ({
            id: i,
            x: Math.random() * 90,
            delay: Math.random() * 2,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        }));
        setBouncingBalls(ballArray);

        // Generate 50 explosion effects
        const explosionArray = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 4
        }));
        setExplosions(explosionArray);

        // Generate 100 trail elements
        const trailArray = Array.from({ length: 100 }, (_, i) => ({
            id: i,
            delay: i * 0.05
        }));
        setTrails(trailArray);
    }, []);

    // Canvas animation for extra stress
    useEffect(() => {
        if (!isRunning) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let canvasParticles = Array.from({ length: 500 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            radius: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        }));

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            canvasParticles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Draw connections
                canvasParticles.forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isRunning]);

    // Increment counter continuously - faster
    useEffect(() => {
        if (!isRunning) return;
        
        const interval = setInterval(() => {
            setCounter(prev => prev + 1);
        }, 10); // Faster updates

        return () => clearInterval(interval);
    }, [isRunning]);

    // FPS counter
    useEffect(() => {
        if (!isRunning) return;

        const fpsInterval = setInterval(() => {
            const now = Date.now();
            const delta = now - lastFrameTimeRef.current;
            const currentFps = Math.round(1000 / delta);
            setFps(currentFps);
            lastFrameTimeRef.current = now;
        }, 100);

        return () => clearInterval(fpsInterval);
    }, [isRunning]);

    // Randomly add DOM elements
    useEffect(() => {
        if (!isRunning) return;

        const addInterval = setInterval(() => {
            setExplosions(prev => [...prev, {
                id: Date.now(),
                x: Math.random() * 100,
                y: Math.random() * 100,
                delay: 0
            }].slice(-100)); // Keep only last 100
        }, 200);

        return () => clearInterval(addInterval);
    }, [isRunning]);

    return (
        <Layout
            title="Heavy Animation Stress Test"
            description="A page with intensive animations designed to stress test performance and automation tools."
        >
            <div className="demo-content">
                <div className="controls-section">
                    <button
                        className={`btn-modern ${isRunning ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => setIsRunning(!isRunning)}
                    >
                        {isRunning ? 'Pause Animations' : 'Resume Animations'}
                    </button>
                    <div className="counter-display">
                        Counter: <span className="counter-value">{counter}</span>
                    </div>
                    <div className="fps-display">
                        FPS: <span className="fps-value">{fps}</span>
                    </div>
                    <div className="info-text">
                        Total Elements: {particles.length + rotatingBoxes.length + pulsingCircles.length + bouncingBalls.length + explosions.length + trails.length + 500}
                    </div>
                </div>

                {/* Canvas Background Animation */}
                <canvas ref={canvasRef} className="background-canvas" />

                {isRunning && (
                    <>
                        {/* Particle System */}
                        <div className="particle-container">
                            {particles.map(particle => (
                                <div
                                    key={`particle-${particle.id}`}
                                    className="particle"
                                    style={{
                                        left: `${particle.x}%`,
                                        top: `${particle.y}%`,
                                        width: `${particle.size}px`,
                                        height: `${particle.size}px`,
                                        animationDelay: `${particle.delay}s`,
                                        animationDuration: `${particle.duration}s`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Rotating Boxes Grid */}
                        <div className="rotating-boxes-container">
                            {rotatingBoxes.map(box => (
                                <div
                                    key={`box-${box.id}`}
                                    className="rotating-box"
                                    style={{
                                        left: `${box.x}%`,
                                        top: `${box.y}%`,
                                        animationDelay: `${box.delay}s`,
                                        backgroundColor: `hsl(${box.hue}, 70%, 50%)`
                                    }}
                                >
                                    <div className="rotating-box-inner" />
                                </div>
                            ))}
                        </div>

                        {/* Pulsing Circles */}
                        <div className="pulsing-circles-container">
                            {pulsingCircles.map(circle => (
                                <div
                                    key={`circle-${circle.id}`}
                                    className="pulsing-circle"
                                    style={{
                                        left: `${circle.x}%`,
                                        top: `${circle.y}%`,
                                        animationDelay: `${circle.delay}s`,
                                        transform: `scale(${circle.scale})`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Bouncing Balls */}
                        <div className="bouncing-balls-container">
                            {bouncingBalls.map(ball => (
                                <div
                                    key={`ball-${ball.id}`}
                                    className="bouncing-ball"
                                    style={{
                                        left: `${ball.x}%`,
                                        animationDelay: `${ball.delay}s`,
                                        backgroundColor: ball.color
                                    }}
                                />
                            ))}
                        </div>

                        {/* Spiraling Elements */}
                        <div className="spiral-container">
                            {Array.from({ length: 60 }, (_, i) => (
                                <div
                                    key={`spiral-${i}`}
                                    className="spiral-element"
                                    style={{
                                        animationDelay: `${i * 0.05}s`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Morphing Shapes */}
                        <div className="morphing-container">
                            {Array.from({ length: 40 }, (_, i) => (
                                <div
                                    key={`morph-${i}`}
                                    className="morphing-shape"
                                    style={{
                                        left: `${(i % 8) * 12.5}%`,
                                        top: `${Math.floor(i / 8) * 20}%`,
                                        animationDelay: `${i * 0.1}s`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Explosion Effects */}
                        <div className="explosions-container">
                            {explosions.map(explosion => (
                                <div
                                    key={`explosion-${explosion.id}`}
                                    className="explosion"
                                    style={{
                                        left: `${explosion.x}%`,
                                        top: `${explosion.y}%`,
                                        animationDelay: `${explosion.delay}s`
                                    }}
                                >
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <div
                                            key={i}
                                            className="explosion-particle"
                                            style={{ transform: `rotate(${i * 30}deg)` }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Trail Effect */}
                        <div className="trail-container">
                            {trails.map(trail => (
                                <div
                                    key={`trail-${trail.id}`}
                                    className="trail-element"
                                    style={{
                                        animationDelay: `${trail.delay}s`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Glitching Elements */}
                        <div className="glitch-container">
                            {Array.from({ length: 30 }, (_, i) => (
                                <div
                                    key={`glitch-${i}`}
                                    className="glitch-box"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 2}s`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Spinning 3D Cubes */}
                        <div className="cube-container">
                            {Array.from({ length: 25 }, (_, i) => (
                                <div
                                    key={`cube-${i}`}
                                    className="cube-3d"
                                    style={{
                                        left: `${(i % 5) * 20}%`,
                                        top: `${Math.floor(i / 5) * 20}%`,
                                        animationDelay: `${i * 0.1}s`
                                    }}
                                >
                                    <div className="cube-face cube-front" />
                                    <div className="cube-face cube-back" />
                                    <div className="cube-face cube-right" />
                                    <div className="cube-face cube-left" />
                                    <div className="cube-face cube-top" />
                                    <div className="cube-face cube-bottom" />
                                </div>
                            ))}
                        </div>

                        {/* Flickering Grid */}
                        <div className="flicker-grid">
                            {Array.from({ length: 100 }, (_, i) => (
                                <div
                                    key={`flicker-${i}`}
                                    className="flicker-cell"
                                    style={{
                                        animationDelay: `${Math.random() * 2}s`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Gradient Waves */}
                        <div className="gradient-waves">
                            <div className="wave wave1" />
                            <div className="wave wave2" />
                            <div className="wave wave3" />
                        </div>

                        {/* Spinning Text */}
                        <div className="spinning-text-container">
                            <div className="spinning-text">testRigor</div>
                            <div className="spinning-text" style={{ animationDelay: '0.3s' }}>EXTREME</div>
                            <div className="spinning-text" style={{ animationDelay: '0.6s' }}>STRESS</div>
                            <div className="spinning-text" style={{ animationDelay: '0.9s' }}>TEST</div>
                        </div>

                        {/* Matrix Rain Effect */}
                        <div className="matrix-container">
                            {Array.from({ length: 50 }, (_, i) => (
                                <div
                                    key={`matrix-${i}`}
                                    className="matrix-column"
                                    style={{
                                        left: `${i * 2}%`,
                                        animationDelay: `${Math.random() * 5}s`,
                                        animationDuration: `${Math.random() * 3 + 2}s`
                                    }}
                                >
                                    {Math.random().toString(36).substring(2, 15)}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default HeavyAnimation;

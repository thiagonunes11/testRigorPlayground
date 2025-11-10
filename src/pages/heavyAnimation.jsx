import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import '../styles/heavyAnimation.css';

const HeavyAnimation = () => {
    const [memorySize, setMemorySize] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const memoryLeakRef = useRef([]);

    useEffect(() => {
        if (!isRunning) return;

        // MASSIVE memory leak bomb - creates huge arrays that never get cleaned up
        const createMassiveMemoryLeak = () => {
            console.log('💣 Creating memory leak...');
            
            // Create 10 MILLION elements in memory
            const leak = new Array(10000000).fill('💀').map((v, i) => ({
                id: i,
                data: new Array(100).fill(Math.random()),
                nested: {
                    more: new Array(100).fill(new Date().toString()),
                    evenMore: new Array(100).fill(window.location.href),
                    deepNest: new Array(100).fill({ x: Math.random(), y: Math.random() }),
                    extraDeep: {
                        level1: new Array(50).fill('data'),
                        level2: new Array(50).fill('more data'),
                        level3: new Array(50).fill('even more data')
                    }
                },
                // Add random circular references to make garbage collection harder
                timestamp: Date.now(),
                randomData: Math.random().toString(36).repeat(100)
            }));
            
            memoryLeakRef.current.push(leak);
            setMemorySize(memoryLeakRef.current.length);
            console.log(`💀 Memory leak ${memoryLeakRef.current.length} created! Total arrays: ${memoryLeakRef.current.length}`);
        };

        // Create initial massive leak
        createMassiveMemoryLeak();

        // Create more leaks every 200ms until browser dies
        const leakInterval = setInterval(() => {
            createMassiveMemoryLeak();
        }, 200);

        return () => clearInterval(leakInterval);
    }, [isRunning]);

    return (
        <Layout
            title="Heavy Animation Stress Test"
            description="Memory leak bomb designed to crash the browser. Check console for logs."
        >
            <div className="demo-content" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '60vh',
                padding: '40px'
            }}>
                <h2 style={{ fontSize: '32px', marginBottom: '20px', textAlign: 'center' }}>
                    Memory Leak Stress Test
                </h2>
                <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', maxWidth: '600px', marginBottom: '30px' }}>
                    Click the button below to start creating massive memory leaks every 200ms. 
                    Your browser will crash within seconds. Open DevTools Console to watch.
                </p>

                {!isRunning ? (
                    <button
                        className="btn-modern btn-danger"
                        onClick={() => setIsRunning(true)}
                        style={{ 
                            fontSize: '16px', 
                            padding: '12px 24px'
                        }}
                    >
                        Start Memory Leak
                    </button>
                ) : (
                    <>
                        <div style={{ 
                            marginTop: '30px', 
                            padding: '20px', 
                            background: 'rgba(255, 0, 0, 0.1)',
                            borderRadius: '8px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            border: '1px solid rgba(255, 0, 0, 0.3)'
                        }}>
                            Leaks Created: {memorySize}
                        </div>
                        <button
                            className="btn-modern btn-secondary"
                            onClick={() => setIsRunning(false)}
                            style={{ marginTop: '20px', fontSize: '16px', padding: '12px 24px' }}
                        >
                            Stop Leaks
                        </button>
                        <p style={{ marginTop: '20px', fontSize: '14px', color: '#999' }}>
                            Warning: Browser will become unresponsive soon
                        </p>
                    </>
                )}

                {!isRunning && (
                    <p style={{ marginTop: '20px', fontSize: '14px', color: '#999' }}>
                        Warning: This will freeze/crash your browser
                    </p>
                )}
            </div>
        </Layout>
    );
};

export default HeavyAnimation;

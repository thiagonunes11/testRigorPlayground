import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/buttonClick.css'; 

const ButtonClick = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <Layout
            title="Button Click Demo"
            description="Click the button to reveal hidden content."
        >
            <div className="demo-content">
                <div className="text-center">
                    <button
                        className="btn-modern btn-primary mb-4"
                        onClick={() => setIsVisible(true)}
                    >
                        Click to Reveal
                    </button>
                    <div
                        className={`fade-in${isVisible ? '' : ' visually-hidden'}`}
                        aria-hidden={!isVisible}
                    >
                        <p className="text-secondary">
                            Congratulations! You've successfully revealed the hidden content.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ButtonClick;

import React, { useState } from 'react';
import Layout from '../components/Layout';

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
                    {isVisible && (
                        <div className="fade-in">
                            <p className="text-secondary">
                                Congratulations! You've successfully revealed the hidden content.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ButtonClick;

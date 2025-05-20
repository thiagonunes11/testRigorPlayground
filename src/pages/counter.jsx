import React, { useState } from 'react';
import Layout from '../components/Layout';

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <Layout
            title="Counter Demo"
            description="A simple counter demonstration with increment and decrement functionality."
        >
            <div className="demo-content">
                <div className="counter-container">
                    <div className="counter-value">{count}</div>
                    <div className="counter-controls">
                        <button
                            className="btn-modern btn-primary"
                            onClick={() => setCount(count + 1)}
                        >
                            Increment
                        </button>
                        <button
                            className="btn-modern btn-secondary"
                            onClick={() => setCount(count - 1)}
                        >
                            Decrement
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Counter;

import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { QRCodeCanvas } from 'qrcode.react';
import Prompt from '../components/Prompt.js'

const QRCodePage = () => {
  const [text, setText] = useState('');
  const [qrValue, setQRValue] = useState('');

  const handleGenerate = () => {
    setQRValue(text); 
    setText('');
  };

  return (
        <main className='container mt-5 text-center'>
            <Prompt title="QR Code" instructions="Enter some text and click the Generate button to generate your QR Code." />
            <input
                type="text"
                placeholder="Enter text here"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{
                padding: '10px',
                width: '300px',
                marginTop: '20px',
                marginBottom: '20px',
                fontSize: '16px',
                }}
            />
            <br />
            <button
                onClick={handleGenerate}
                style={{
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                }}
            >
                Generate
            </button>
            <div style={{ marginTop: '30px' }}>
                {qrValue && (
                <>
                    <h2>Your QR Code:</h2>
                    <QRCodeCanvas value={qrValue} size={256} />
                </>
                )}
            </div>
        </main>
  );
};

export default QRCodePage;

import React, { useRef, useState } from 'react';
import QRCode from 'qrcode';

const QRCodePage = () => {
  const qrCodeRef = useRef(null);  
  const [inputText, setInputText] = useState('');  

  const generateQRCode = () => {
    if (inputText.trim() === '') {
      alert('Please, enter some text to generate the QR Code.');
      return;
    }

    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = ''; 
    }

    QRCode.toCanvas(qrCodeRef.current, inputText, {
      width: 256,
      height: 256
    }, (error) => {
      if (error) {
        console.error('Error generating QR code:', error);
        return;
      }
      console.log('QR code generated successfully');
    });

    setInputText('');
  };

  return (
    <div className="container text-center mt-5">
      <div className="row justify-content-center">
        <div className="col-6 border p-2 pt-4">
          <h1 className="fs-2 fw-bold">QR Code</h1>
          <p>
            <small>Enter the text and click the button to generate a QR Code.</small>
          </p>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Enter the text here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <button className="btn btn-primary" onClick={generateQRCode}>
            Generate QR Code
          </button>
          <div ref={qrCodeRef} className="mt-5 d-flex justify-content-center"></div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;

import React from 'react';
import Layout from '../components/Layout';
import '../styles/homePage.css';
import samplePDF from '../assets/file_samples/sample.pdf';

const PdfPreview = () => {
    const handlePreview = () => {
        window.open(samplePDF, '_blank', 'noopener,noreferrer');
    };

    return (
        <Layout
            title="PDF Preview"
            description="Click the button below to preview the PDF in a new browser tab."
        >
            <div className="demo-content text-center">
                <h4 className="mb-4">Sample PDF Preview</h4>
                <button
                    className="btn btn-primary btn-lg"
                    onClick={handlePreview}
                    data-testid="pdf-preview-btn"
                >
                    Preview PDF
                </button>
            </div>
        </Layout>
    );
};

export default PdfPreview;
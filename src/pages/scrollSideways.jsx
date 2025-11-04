import React from "react";
import Layout from '../components/Layout';

const ScrollSideways = () => {
  return (
    <Layout
      title="Scroll Sideways"
      description="Scroll horizontally in order to find the desired vegetable name."
    >
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ 
          width: '90vw',
          minHeight: '300px',
          overflowX: 'auto',
          border: '2px solid #dee2e6',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            whiteSpace: 'nowrap',
            alignItems: 'center'
          }}>
            <p style={{ margin: 0 }}>The first vegetable is carrot.</p>
            <div style={{ width: '200vw', flexShrink: 0 }}></div>
            <p style={{ margin: 0 }}>The second vegetable is broccoli.</p>
            <div style={{ width: '200vw', flexShrink: 0 }}></div>
            <p style={{ margin: 0 }}>The third vegetable is spinach.</p>
            <div style={{ width: '200vw', flexShrink: 0 }}></div>
            <p style={{ margin: 0 }}>The fourth vegetable is zucchini.</p>
            <div style={{ width: '200vw', flexShrink: 0 }}></div>
            <p style={{ margin: 0 }}>The fifth vegetable is eggplant.</p>
            <div style={{ width: '200vw', flexShrink: 0 }}></div>
            <p style={{ margin: 0 }}>And the sixth and final vegetable is bell pepper.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScrollSideways;
import React from "react";
import Layout from '../components/Layout';
import { Card } from 'react-bootstrap';

const vegetables = [
  { id: 1, name: 'Carrot', color: '#e67e22', icon: '🥕', description: 'Crunchy and orange.' },
  { id: 2, name: 'Broccoli', color: '#2ecc71', icon: '🥦', description: 'Miniature trees.' },
  { id: 3, name: 'Spinach', color: '#27ae60', icon: '🍃', description: 'Popeye\'s favorite.' },
  { id: 4, name: 'Zucchini', color: '#16a085', icon: '🥒', description: 'Great for bread.' },
  { id: 5, name: 'Eggplant', color: '#8e44ad', icon: '🍆', description: 'Purple and shiny.' },
  { id: 6, name: 'Bell Pepper', color: '#e74c3c', icon: '🫑', description: 'Sweet and crunchy.' }
];

const ScrollSideways = () => {
  return (
    <Layout
      title="Scroll Sideways"
      description="Scroll horizontally to find all the vegetables. We've placed them far apart to test your scrolling endurance!"
    >
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <div
          id="sideways-scroll-container"
          style={{
            width: '90vw',
            padding: '2rem',
            overflowX: 'auto',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {vegetables.map((veg, index) => (
            <React.Fragment key={veg.id}>
              <Card
                className="modern-card text-center"
                style={{
                  width: '300px',
                  minWidth: '300px', // Prevent shrinking
                  flexShrink: 0,
                  borderTop: `4px solid ${veg.color}`,
                  margin: 0
                }}
              >
                <Card.Body>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{veg.icon}</div>
                  <Card.Title style={{ color: veg.color, fontWeight: 'bold' }}>{veg.name}</Card.Title>
                  <Card.Text className="text-muted">
                    {veg.description}
                  </Card.Text>
                </Card.Body>
              </Card>

              {/* Spacer (except after the last item) */}
              {index < vegetables.length - 1 && (
                <div style={{
                  width: '200vw', // The massive spacer as requested
                  height: '2px',
                  background: `linear-gradient(90deg, ${veg.color}, var(--border), ${vegetables[index + 1].color})`,
                  flexShrink: 0,
                  opacity: 0.5,
                  margin: '0 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    backgroundColor: 'var(--card-bg)',
                    padding: '0.5rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.8rem'
                  }}>
                    Keep scrolling...
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ScrollSideways;
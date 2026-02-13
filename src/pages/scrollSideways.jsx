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
      title="Sideways Scroll with Snap"
      description="Scroll horizontally seamlessly. We use scroll-snap to ensure each vegetable snaps into view, making it easy to test 'scroll to' commands."
    >
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <div
          id="sideways-scroll-container"
          tabIndex="0"
          data-testid="scroll-container"
          style={{
            width: '90vw',
            maxWidth: '800px', // Limit width for better focus
            padding: '2rem',
            overflowX: 'auto',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            alignItems: 'center',
            scrollSnapType: 'x mandatory', // This isolates the elements
            gap: '50vw' // Use gap instead of spacers for cleaner code
          }}
        >
          {vegetables.map((veg) => (
            <Card
              key={veg.id}
              id={veg.name.toLowerCase().replace(' ', '-')}
              data-testid={`vegetable-${veg.id}`}
              className="modern-card text-center flex-shrink-0"
              style={{
                width: '300px',
                minWidth: '300px',
                borderTop: `4px solid ${veg.color}`,
                scrollSnapAlign: 'center', // Snap to this element
                margin: 0
              }}
            >
              <Card.Body>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{veg.icon}</div>
                <Card.Title style={{ color: veg.color, fontWeight: 'bold', fontSize: '1.5rem' }}>{veg.name}</Card.Title>
                <Card.Text className="text-muted fs-5">
                  {veg.description}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}

          {/* Final spacer to allow the last item to be centered if needed, 
              though scroll-snap usually handles this. Adding a small padding 
              end element just in case. */}
          <div style={{ minWidth: '1px', height: '1px' }}></div>
        </div>
      </div>
    </Layout>
  );
};

export default ScrollSideways;
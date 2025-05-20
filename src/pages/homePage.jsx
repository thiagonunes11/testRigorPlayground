import React from 'react';
import { Row } from 'react-bootstrap';
import Layout from '../components/Layout';
import DemoBlock from '../components/DemoBlock';
import demos from '../store/demos';
import '../styles/homePage.css';

const HomePage = () => {
  return (
    <Layout
      title="Welcome to testRigor Playground"
      description="Explore our collection of interactive demos designed to help you test various web elements and interactions."
    >
      <div className="card-grid">
        {demos.map((demo, index) => (
          <DemoBlock key={index} {...demo} />
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
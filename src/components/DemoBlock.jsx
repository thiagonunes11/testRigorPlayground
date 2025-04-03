import React from 'react';
import { Link } from 'react-router-dom';

const DemoBlock = ({ title, description, path, icon }) => {
  return (
    <Link to={path} className="modern-card">
      <div className="card-content">
        <div className="card-icon">
          {icon}
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </Link>
  );
};

export default DemoBlock;
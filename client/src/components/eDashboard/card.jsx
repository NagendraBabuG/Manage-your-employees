import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ route, title, image }) => {
  return (
    <Link to={route} className="card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
    </Link>
  );
};

export default Card;

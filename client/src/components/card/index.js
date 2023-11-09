import React from 'react';

import './index.scss'; // make sure to create a corresponding SCSS file

const CardComponent = ({ imageUrl, title, description, author, likes, views }) => {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src={imageUrl} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-footer">
          <span className="card-author">{author}</span>
          <div className="card-stats">
            <span className="card-likes">❤️ {likes}</span>
            <span className="card-views">👁️ {views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;

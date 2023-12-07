import React, { useState } from 'react';
import './index.scss';

const CardComponent = ({ imageUrl, title, description, author, initialLikes = 0, initialViews = 0 }) => {
  // Ensure that initialLikes and initialViews are numbers
  const [likes, setLikes] = useState(Number(initialLikes));
  const [views, setViews] = useState(Number(initialViews));

  const handleLike = (event) => {
    // Prevent the click from triggering handleView on the card
    event.stopPropagation();
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleView = () => {
    setViews((prevViews) => prevViews + 1);
  };

  return (
    <div className="blog-card" onClick={handleView}>
      <div className="card-image-container">
        <img src={imageUrl} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-footer">
          <span className="card-author">{author}</span>
          <div className="card-stats">
            <button className="card-likes" onClick={handleLike}>❤️ {likes}</button>
            <span className="card-views">👁️ {views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;

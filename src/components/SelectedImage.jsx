import React from "react";

const SelectedImage = ({ src, onClose }) => {
  return (
    <div className="center-image">
      <img src={src} alt="Selected" />
      <button className="close-btn" onClick={onClose}>
        <span>X</span>
      </button>
    </div>
  );
};

export default SelectedImage;

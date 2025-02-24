import React from "react";
import { SelectedImageProps } from "../services/types";

const SelectedImage: React.FC<SelectedImageProps> = ({ src, onClose }) => {
  return (
    <div className="center-image">
      <img className="central-img-setup" src={src} alt="Selected" />
      <button className="close-btn" onClick={onClose}>
        <span>X</span>
      </button>
    </div>
  );
};

export default SelectedImage;

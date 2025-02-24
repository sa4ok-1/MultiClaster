import React from "react";
import { motion } from "framer-motion";

const OuterImage = ({ src, onClick }) => {
  return (
    <motion.div drag className="image-container">
      <img src={src} className="outer-image" onClick={onClick} onDragStart={(e) => e.preventDefault()} alt="Open Menu" />
      <div className="hover-text">
        <span className="claster-text">MULTICLASTER</span>
      </div>
    </motion.div>
  );
};

export default OuterImage;

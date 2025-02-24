import React from "react";
import { motion } from "framer-motion";
import { CircleProps } from "../services/types";

const Circle: React.FC<CircleProps> = ({ images, angle, rotate, onSelectImage, onClose }) => {
  return (
    <div className="circle-wrapper">
      <motion.div className="circle" animate={{ rotate: angle }} transition={{
        type: "tween",
        duration: 0.6,
        ease: "linear",
      }}>
        {images.map((src, index) => (
          <motion.img key={index} src={src} className="circle-item" onClick={() => onSelectImage(src)} onDragStart={(e) => e.preventDefault()} />
        ))}
      </motion.div>

      <div className="controls">
        <button className="btn left" onClick={() => rotate(-1)}></button>
        <div className="sticks-container">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="stick"></div>
          ))}
        </div>
        <button className="btn right" onClick={() => rotate(1)}></button>
      </div>

      <button className="close-btn" onClick={onClose}>X</button>
    </div>
  );
};

export default Circle;

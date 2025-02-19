import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

const initialImages = [
  "https://picsum.photos/100/100?random=1",
  "https://picsum.photos/100/100?random=2",
  "https://picsum.photos/100/100?random=3",
  "https://picsum.photos/100/100?random=4",
  "https://picsum.photos/100/100?random=5",
  "https://picsum.photos/100/100?random=6",
  "https://picsum.photos/100/100?random=7",
];

const CircleMenu = () => {
  const [angle, setAngle] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const radius = 150;
  const imageAreaAngle = 270;

  const rotate = (direction) => {
    setAngle((prev) => prev + direction * (imageAreaAngle / initialImages.length));
  };

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleCloseClick = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container">
      <div className="circle-wrapper">

        <motion.div
          className="circle"
          animate={{ rotate: angle }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {initialImages.map((src, index) => {
            const angle = ((index / initialImages.length) * imageAreaAngle - imageAreaAngle / 2) * (Math.PI / 180);
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <motion.img
                key={index}
                src={src}
                className="circle-item"
                style={{ transform: `translate(${x}px, ${y}px)` }}
                onClick={() => handleImageClick(src)}
              />
            );
          })}
        </motion.div>

        <div className="controls">
          <button className="btn left" onClick={() => rotate(-1)}>⬅</button>
          <button className="btn right" onClick={() => rotate(1)}>➡</button>
        </div>
      </div>

      {/* Зображення в центрі кола */}
      {selectedImage && (
        <div className="center-image">
          <img src={selectedImage} alt="Selected" />
          <button className="close-btn" onClick={handleCloseClick}>
            <span>X</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CircleMenu;
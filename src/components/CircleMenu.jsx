import React, { useState } from "react";
import * as motion from "motion/react-client";
import "./App.css";

const initialImages = [
  "https://picsum.photos/100/100?random=1",
  "https://picsum.photos/100/100?random=2",
  "https://picsum.photos/100/100?random=3",
  "https://picsum.photos/100/100?random=4",
  "https://picsum.photos/100/100?random=5",
  "https://picsum.photos/100/100?random=6",
  "https://picsum.photos/100/100?random=7",
  "https://picsum.photos/100/100?random=8",
  "https://picsum.photos/100/100?random=9",
  "https://picsum.photos/100/100?random=10",
];

const CircleMenu = () => {
  const [angle, setAngle] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const imageAreaAngle = 360;
  const outerImage = "https://picsum.photos/150/150?random=10";

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
    <div className="outer-container">
      {!isOpen ? (
        <motion.div drag className="image-container">
          <img
            src={outerImage}
            className="outer-image"
            onClick={() => setIsOpen(true)}
            onDragStart={(e) => e.preventDefault()}
            alt="Open Menu"
          />
          <div className="hover-text"><span className="claster-text">MULTICLASTER</span></div>
        </motion.div>
      ) : (
        <motion.div drag className="container">
          <div className="circle-wrapper">
            <motion.div
              className="circle"
              animate={{ rotate: angle }}
              transition={{ type: "spring", stiffness: 100 }}

            >
              {initialImages.map((src, index) => {
                return (
                  <motion.img
                    key={index}
                    src={src}
                    className="circle-item"
                    onClick={() => handleImageClick(src)}
                    onDragStart={(e) => e.preventDefault()}
                  />
                );
              })}
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

            <button className="close-btn" onClick={() => setIsOpen(false)}>X</button>
          </div>

          {selectedImage && (
            <div className="center-image">
              <img src={selectedImage} alt="Selected" />
              <button className="close-btn" onClick={handleCloseClick}>
                <span>X</span>
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CircleMenu;

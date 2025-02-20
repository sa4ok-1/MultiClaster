import React, { useState, useEffect, useRef } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const radius = 150;
  const imageAreaAngle = 270;
  const outerImage = "https://picsum.photos/150/150?random=10";

  useEffect(() => {
    if (initialImages.length > 0) {
      setSelectedImage(initialImages[0]);
    }

    // Розрахунок початкового положення по центру сторінки
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    const centerX = window.innerWidth / 2 - containerWidth / 2;
    const centerY = window.innerHeight / 2 - containerHeight / 2;

    setPosition({ x: centerX, y: centerY });
  }, []);

  const rotate = (direction) => {
    setAngle((prev) => prev + direction * (imageAreaAngle / initialImages.length));
  };

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleCloseClick = () => {
    setSelectedImage(null);
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    const shiftX = event.clientX - containerRef.current.getBoundingClientRect().left;
    const shiftY = event.clientY - containerRef.current.getBoundingClientRect().top;

    const handleMouseMove = (event) => {
      if (isDragging) {
        const newX = event.clientX - shiftX;
        const newY = event.clientY - shiftY;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="outer-container">
      {!isOpen ? (
        <div
          ref={containerRef}
          className="image-container"
          onMouseDown={handleMouseDown}
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <img
            src={outerImage}
            className="outer-image"
            onClick={() => setIsOpen(true)}
            onDragStart={(e) => e.preventDefault()}
            alt="Open Menu"
          />
          <div className="hover-text"><span className="claster-text">MULTICLASTER</span></div>
        </div>
      ) : (
        <div
          className="container"
          style={{ position: "absolute", left: position.x, top: position.y }}
          ref={containerRef}
          onMouseDown={handleMouseDown}
        >
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
                    style={{ position: "absolute", transform: `translate(${x}px, ${y}px)` }}
                    onClick={() => handleImageClick(src)}
                    onDragStart={(e) => e.preventDefault()}
                    onMouseDown={handleMouseDown}
                  />
                );
              })}
            </motion.div>

            <div className="controls">
              <button className="btn left" onClick={() => rotate(-1)}></button>

              <div className="sticks-container">
                <div className="stick"></div>
                <div className="stick"></div>
                <div className="stick"></div>
                <div className="stick"></div>
                <div className="stick"></div>
                <div className="stick"></div>
                <div className="stick"></div>
                <div className="stick"></div>
                <div className="stick"></div>
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
        </div>
      )}
    </div>
  );
};

export default CircleMenu;
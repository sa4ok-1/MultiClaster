import React, { useState } from "react";
import { motion } from "framer-motion";
import Circle from "./Circle";
import OuterImage from "./OuterImage";
import SelectedImage from "./SelectedImage";
import "../styles/main.scss";
import { initialImages } from "../services/config";

const CircleMenu = () => {
  const [angle, setAngle] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const imageAreaAngle = 360;
  const imagesPerRotationStep = 3;
  const outerImage = "https://picsum.photos/150/150?random=10";

  const rotate = (direction: number) => {
    setAngle(
      (prev) =>
        prev +
        direction *
          (imageAreaAngle / initialImages.length) *
          imagesPerRotationStep
    );
  };

  return (
    <div className="outer-container">
      {!isOpen ? (
        <OuterImage src={outerImage} onClick={() => setIsOpen(true)} />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          drag
          className="container"
        >
          <Circle
            images={initialImages}
            angle={angle}
            rotate={rotate}
            onSelectImage={(src) => setSelectedImage(src)}
            onClose={() => setIsOpen(false)}
          />
          {selectedImage && (
            <SelectedImage
              src={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CircleMenu;

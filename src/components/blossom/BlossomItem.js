import React, { useState } from "react";
import {
  BlossomContainer,
  BlossomNumber,
  BlossomImage,
  BlossomName,
} from "../../styles/HarmonyWheelStyles";

const BlossomItem = ({
  blossom,
  showName = true,
  showNumber = false,
  blossomData,
}) => {
  const [imageError, setImageError] = useState(false);
  const imageName = blossom.toLowerCase().replace(/\s+/g, "_");
  const imagePath = require(`../../images/blossoms/${imageName}.png`);
  const placeholderPath = require("../../images/blossoms/beech.png"); // Stellen Sie sicher, dass Sie ein Platzhalterbild haben

  const handleImageError = () => {
    setImageError(true);
    console.warn(`Image not found for ${blossom}, using placeholder`);
  };
  const blossomInfo = blossomData[blossom];
  return (
    <BlossomContainer>
      <BlossomImage
        src={imageError ? placeholderPath : imagePath}
        alt={blossom}
        onError={handleImageError}
      />
      {showName && (
        <BlossomName>
          {showNumber && blossomInfo && (
            <BlossomNumber>{blossomInfo.nummer}. </BlossomNumber>
          )}
          {blossom}
        </BlossomName>
      )}
    </BlossomContainer>
  );
};

export default BlossomItem;

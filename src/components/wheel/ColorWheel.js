import React from "react";
import { useSpring, config } from "@react-spring/web";
import {
  SectorBase,
  AnimatedSectorContent,
  WheelContainer,
  Wheel,
} from "../../styles/HarmonyWheelStyles";

const AnimatedSector = ({
  color,
  index,
  totalSectors,
  onSectorClick,
  isActive,
}) => {
  const angle = (index * 360) / totalSectors;
  const skew = 90 - 360 / totalSectors;

  const springProps = useSpring({
    to: {
      opacity: isActive ? 1 : 0.7,
      scale: isActive ? 1.05 : 1,
    },
    config: config.gentle,
  });

  return (
    <SectorBase
      style={{
        transform: `rotate(${angle}deg) skew(${skew}deg)`,
      }}
      onClick={() => onSectorClick(color)}
    >
      <AnimatedSectorContent
        style={{
          opacity: springProps.opacity,
          transform: springProps.scale.to((s) => `scale(${s})`),
          boxShadow: isActive ? "0 0 20px rgba(0,0,0,0.3)" : "none",
          backgroundColor: color,
        }}
      />
    </SectorBase>
  );
};

const ColorWheel = ({ colors, onColorClick, activeColor }) => {
  return (
    <WheelContainer>
      <Wheel>
        {colors.map((color, index) => (
          <AnimatedSector
            key={color}
            color={color}
            index={index}
            totalSectors={colors.length}
            onSectorClick={onColorClick}
            isActive={activeColor === color}
          />
        ))}
      </Wheel>
    </WheelContainer>
  );
};

export default ColorWheel;

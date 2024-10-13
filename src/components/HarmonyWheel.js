import React from "react";
import styled from "styled-components";
import { useSpring, animated, config } from "@react-spring/web";

const WheelContainer = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
  margin: 0 auto;
`;

const Wheel = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid transparent;
  position: relative;
`;

const SectorBase = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  left: 50%;
  top: 50%;
  transform-origin: 0% 0%;
`;

const AnimatedSectorContent = styled(animated.div)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  transform-origin: 0% 0%;
`;

const Center = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Satisfy", cursive;
  font-size: 1.2rem;
  color: #4682b4;
  z-index: 10;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AnimatedSector = ({
  sector,
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
      zIndex: isActive ? 10 : 1,
      border: isActive ? "1px solid white" : "1px solid transparent",
    },
    config: config.gentle,
  });

  return (
    <SectorBase
      style={{
        transform: `rotate(${angle}deg) skew(${skew}deg)`,
      }}
      onClick={() => onSectorClick(sector)}
    >
      <AnimatedSectorContent
        style={{
          opacity: springProps.opacity,
          transform: springProps.scale.to((s) => `scale(${s})`),
          zIndex: springProps.zIndex,
          border: springProps.border,
          boxShadow: isActive ? "0 0 20px rgba(0,0,0,0.8)" : "none",
        }}
        color={sector.color}
      />
    </SectorBase>
  );
};

const HarmonyWheel = ({ sectors, onSectorClick, activeSector }) => {
  return (
    <WheelContainer>
      <Wheel>
        {sectors.map((sector, index) => (
          <AnimatedSector
            key={sector.group}
            sector={sector}
            index={index}
            totalSectors={sectors.length}
            onSectorClick={onSectorClick}
            isActive={activeSector === sector}
          />
        ))}
      </Wheel>
      <Center>Harmonie</Center>
    </WheelContainer>
  );
};

export default HarmonyWheel;

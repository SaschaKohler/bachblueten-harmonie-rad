import React from "react";
import { useSpring, config } from "@react-spring/web";

import {
  SectorBase,
  WheelAndInfoContainer,
  Wheel,
  WheelContainer,
  Center,
  InfoTitle,
  InfoDescription,
  AnimatedInfoPanel,
  AnimatedSectorContent,
} from "../../styles/HarmonyWheelStyles";

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
      border: isActive ? "1px solid gray" : "1px solid transparent",
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
  const infoPanelAnimation = useSpring({
    opacity: activeSector ? 1 : 0,
    transform: activeSector ? "translateY(0)" : "translateY(20px)",
    config: config.gentle,
  });
  return (
    <WheelAndInfoContainer>
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

      <AnimatedInfoPanel style={infoPanelAnimation}>
        {activeSector ? (
          <>
            <InfoTitle>{activeSector.group}</InfoTitle>
            <InfoDescription>{activeSector.description}</InfoDescription>
          </>
        ) : (
          <InfoDescription>
            Wählen Sie eine Gefühlsgruppe aus, um mehr Informationen zu sehen.
          </InfoDescription>
        )}
      </AnimatedInfoPanel>
    </WheelAndInfoContainer>
  );
};

export default HarmonyWheel;

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
const WheelAndInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
`;

const AnimatedInfoPanel = styled(animated.div)`
  width: 300px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
const InfoTitle = styled.h3`
  margin-top: 0;
  color: #333;
  font-size: 1.2em;
`;

const InfoDescription = styled.p`
  color: #666;
  font-size: 0.9em;
  line-height: 1.5;
`;

const BlossomList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
`;

const BlossomItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const BlossomImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 5px;
`;

const BlossomName = styled.span`
  font-size: 0.8em;
  color: #444;
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
            <BlossomList>
              {activeSector.blossoms.map((blossom) => (
                <BlossomItem key={blossom}>
                  <BlossomImage
                    src={`/images/blossoms/${blossom.toLowerCase().replace(/\s+/g, "_")}.png`}
                    alt={blossom}
                  />
                  <BlossomName>{blossom}</BlossomName>
                </BlossomItem>
              ))}
            </BlossomList>
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

import React, { useState } from "react";
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

const AnimatedSector = ({ item, index, totalItems, onClick, isActive }) => {
  const angle = (index * 360) / totalItems;
  const skew = 90 - 360 / totalItems;

  const springProps = useSpring({
    to: {
      // opacity: isActive ? 1 : 0.7,
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
      onClick={() => onClick(item)}
    >
      <AnimatedSectorContent
        style={{
          opacity: springProps.opacity,
          transform: springProps.scale.to((s) => `scale(${s})`),
          zIndex: springProps.zIndex,
          border: springProps.border,
          boxShadow: isActive ? "0 0 20px rgba(0,0,0,0.8)" : "none",
        }}
        color={item.color || item.shade}
      />
    </SectorBase>
  );
};

const ColorSelector = ({
  sectors,
  onSectorClick,
  isActive,
  onBlossomSelect,
}) => {
  const [selectedSector, setSelectedSector] = useState(null);

  const handleSectorClick = (sector) => {
    setSelectedSector(sector);
    onSectorClick(sector);
  };

  const handleBlossomClick = (blossom) => {
    onBlossomSelect(blossom.name);
  };

  const infoPanelAnimation = useSpring({
    opacity: selectedSector ? 1 : 0,
    transform: selectedSector ? "translateY(0)" : "translateY(20px)",
    config: config.gentle,
  });

  const generateShade = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  const blossomShades = selectedSector
    ? selectedSector.blossoms.map((blossom, index) => {
        const percent =
          -30 + (index * 60) / (selectedSector.blossoms.length - 1);
        return {
          name: blossom,
          shade: generateShade(selectedSector.color, percent),
        };
      })
    : [];
  return (
    <WheelAndInfoContainer className="flex flex-col sm:flex-row items-center sm:items-start justify-center">
      <WheelContainer className="mb-4 sm:mb-0 sm:mr-4">
        <Wheel>
          {sectors.map((sector, index) => (
            <AnimatedSector
              key={sector.group}
              item={sector}
              index={index}
              totalItems={sectors.length}
              onClick={handleSectorClick}
              isActive={selectedSector === sector}
            />
          ))}
        </Wheel>
        <Center>Gefühle</Center>
      </WheelContainer>

      {selectedSector && (
        <WheelContainer className="mb-4 sm:mb-0 sm:mr-4">
          <Wheel>
            {blossomShades.map((blossom, index) => (
              <AnimatedSector
                key={blossom.name}
                item={blossom}
                index={index}
                totalItems={blossomShades.length}
                onClick={handleBlossomClick}
                isActive={false} // You might want to track active blossom separately
              />
            ))}
          </Wheel>
          <Center>Blüten</Center>
        </WheelContainer>
      )}

      <AnimatedInfoPanel style={infoPanelAnimation}>
        {selectedSector ? (
          <>
            <InfoTitle>{selectedSector.group}</InfoTitle>
            <InfoDescription>{selectedSector.description}</InfoDescription>
          </>
        ) : (
          <InfoDescription>
            Wählen Sie eine Gefühlsgruppe aus, um die zugehörigen Blüten zu
            sehen.
          </InfoDescription>
        )}
      </AnimatedInfoPanel>
    </WheelAndInfoContainer>
  );
};

export default ColorSelector;

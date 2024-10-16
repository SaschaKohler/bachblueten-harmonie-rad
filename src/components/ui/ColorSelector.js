import React, { useState } from "react";
import ColorWheel from "../wheel/ColorWheel";
import { blossomData } from "../../data/blossomData";

const ColorSelector = ({ sectors, onSectorClick, activeSector }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const groupColors = sectors.map((sector) => sector.color);
  const shades = selectedGroup
    ? selectedGroup.blossoms.map((blossom) => blossomData[blossom].color)
    : [];

  const handleGroupSelect = (color) => {
    const selectedSector = sectors.find((sector) => sector.color === color);
    setSelectedGroup(selectedSector);
  };

  const handleShadeSelect = (color) => {
    const selectedBlossom = Object.values(blossomData).find(
      (blossom) => blossom.color === color,
    );
    if (selectedBlossom) {
      onSectorClick(
        sectors.find((sector) => sector.group === selectedBlossom.gruppe),
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <ColorWheel
        colors={groupColors}
        onColorClick={handleGroupSelect}
        activeColor={selectedGroup?.color}
      />
      {selectedGroup && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            {selectedGroup.group}
          </h3>
          <ColorWheel
            colors={shades}
            onColorClick={handleShadeSelect}
            activeColor={activeSector?.color}
          />
        </div>
      )}
    </div>
  );
};

export default ColorSelector;

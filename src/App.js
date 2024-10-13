import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import HarmonyWheel from "./components/HarmonyWheel";
import BlossomGrid from "./components/BlossomGrid";
import DropZone from "./components/DropZone";
import Results from "./components/Results";
import InfoCard from "./components/InfoCard";
import { sectors, blossomData } from "./data/blossomData";

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #4682b4;
  text-align: center;
`;

const WheelAndInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 20px;
`;

function App() {
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedBlossoms, setSelectedBlossoms] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSectorClick = (sector) => {
    setSelectedSector(sector);
    setShowResults(false);
  };

  const handleBlossomSelect = useCallback((blossom) => {
    setSelectedBlossoms((prev) => {
      if (!prev.includes(blossom)) {
        return [...prev, blossom];
      }
      return prev;
    });
  }, []);

  const handleBlossomRemove = useCallback((blossomToRemove) => {
    setSelectedBlossoms((prev) =>
      prev.filter((blossom) => blossom !== blossomToRemove),
    );
  }, []);

  const handleConfirm = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedSector(null);
    setSelectedBlossoms([]);
    setShowResults(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContainer>
        <Title>Bachblüten Harmonie-Rad</Title>
        <WheelAndInfoContainer>
          <HarmonyWheel
            sectors={sectors}
            onSectorClick={handleSectorClick}
            activeSector={selectedSector}
          />
          <InfoCard sector={selectedSector} />
        </WheelAndInfoContainer>
        {selectedSector && !showResults && (
          <>
            <h2>{selectedSector.group}</h2>
            <BlossomGrid
              blossoms={selectedSector.blossoms}
              selectedBlossoms={selectedBlossoms}
              onBlossomSelect={handleBlossomSelect}
            />
          </>
        )}
        {!showResults && (
          <>
            <DropZone
              selectedBlossoms={selectedBlossoms}
              onBlossomRemove={handleBlossomRemove}
              onBlossomAdd={handleBlossomSelect}
            />
            <button
              onClick={handleConfirm}
              disabled={selectedBlossoms.length === 0}
            >
              Auswahl bestätigen
            </button>
          </>
        )}
        {showResults && (
          <Results
            selectedBlossoms={selectedBlossoms}
            blossomData={blossomData}
            onReset={handleReset}
          />
        )}
      </AppContainer>
    </DndProvider>
  );
}

export default App;

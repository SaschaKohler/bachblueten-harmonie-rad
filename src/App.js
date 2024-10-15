import React, { useState, useCallback } from "react";
import HarmonyWheel from "./components/HarmonyWheel";
import BlossomGrid from "./components/BlossomGrid";
import ColorSelector from "./components/ColorSelector";
import DropZone from "./components/DropZone";
import Results from "./components/Results";
import { sectors, blossomData } from "./data/blossomData";

function App() {
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedBlossoms, setSelectedBlossoms] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [useColorSelection, setUseColorSelection] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Bachblüten Harmonie-Rad
        </h1>
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 rounded-l-full ${!useColorSelection ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
            onClick={() => setUseColorSelection(false)}
          >
            Gefühlsgruppen
          </button>
          <button
            className={`px-6 py-2 rounded-r-full ${useColorSelection ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
            onClick={() => setUseColorSelection(true)}
          >
            Farbauswahl
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8">
          {useColorSelection ? (
            <ColorSelector
              sectors={sectors}
              onSectorClick={handleSectorClick}
              activeSector={selectedSector}
            />
          ) : (
            <HarmonyWheel
              sectors={sectors}
              onSectorClick={handleSectorClick}
              activeSector={selectedSector}
            />
          )}
          {selectedSector && !showResults && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                {selectedSector.group}
              </h2>
              <BlossomGrid
                blossoms={selectedSector.blossoms}
                selectedBlossoms={selectedBlossoms}
                onBlossomSelect={handleBlossomSelect}
              />
            </div>
          )}
          {!showResults && (
            <div className="mt-8">
              <DropZone
                selectedBlossoms={selectedBlossoms}
                onBlossomRemove={handleBlossomRemove}
              />
              <button
                onClick={handleConfirm}
                disabled={selectedBlossoms.length === 0}
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full disabled:opacity-50"
              >
                Auswahl bestätigen
              </button>
            </div>
          )}
          {showResults && (
            <Results
              selectedBlossoms={selectedBlossoms}
              blossomData={blossomData}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

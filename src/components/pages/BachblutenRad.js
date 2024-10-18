import React, { useState, useCallback, useEffect } from "react";
import HarmonyWheel from "../wheel/HarmonyWheel";
import BlossomGrid from "../blossom/BlossomGrid";
import ColorSelector from "../ui/ColorSelector";
import DropZone from "../DropZone";
import Results from "../Results";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../config/supabaseClient";
import { sectors, blossomData } from "../../data/blossomData";

const BachblutenRad = () => {
  const { user } = useAuth();
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

  // useEffect(() => {
  //   const checkUser = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     setUser(user);
  //   };
  //   checkUser();
  // }, []);
  //
  // if (!user) {
  //   return <div>Bitte melden Sie sich an, um das Bachblüten-Rad zu sehen.</div>;
  // }

  console.log("Rendering BachblutenRad", user);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-xl mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-800 mb-4 sm:mb-6 md:mb-8">
          Bachblüten Harmonie-Rad
        </h1>
        <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-l-full ${!useColorSelection ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
            onClick={() => setUseColorSelection(false)}
          >
            Gefühlsgruppen
          </button>
          <button
            className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-r-full ${useColorSelection ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
            onClick={() => setUseColorSelection(true)}
          >
            Farbauswahl
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          {useColorSelection ? (
            <ColorSelector
              sectors={sectors}
              onSectorClick={handleSectorClick}
              activeSector={selectedSector}
              onBlossomSelect={handleBlossomSelect}
            />
          ) : (
            <HarmonyWheel
              sectors={sectors}
              onSectorClick={handleSectorClick}
              activeSector={selectedSector}
            />
          )}
          {selectedSector && !showResults && (
            <div className="mt-4 sm:mt-6 md:mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-2 sm:mb-4">
                {selectedSector.group}
              </h2>
              <BlossomGrid
                blossoms={selectedSector.blossoms}
                selectedBlossoms={selectedBlossoms}
                onBlossomSelect={handleBlossomSelect}
                blossomData={blossomData}
              />
            </div>
          )}
          {!showResults && (
            <div className="mt-4 sm:mt-6 md:mt-8">
              <DropZone
                selectedBlossoms={selectedBlossoms}
                onBlossomRemove={handleBlossomRemove}
                blossomData={blossomData}
              />
              <button
                onClick={handleConfirm}
                disabled={selectedBlossoms.length === 0}
                className="mt-4 px-4 py-2 w-full sm:w-auto text-sm sm:text-base bg-green-500 text-white rounded-full disabled:opacity-50"
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
};

export default BachblutenRad;

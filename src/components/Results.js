import React from "react";

const Results = ({ selectedBlossoms, blossomData, onReset }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">
        Ihre Bachblüten Auswahl
      </h2>
      <div className="space-y-4">
        {selectedBlossoms.map((blossom) => {
          const data = blossomData[blossom];
          return (
            <div key={blossom} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center mb-2">
                <img
                  src={`/images/blossoms/${blossom.toLowerCase().replace(/\s+/g, "_")}.png`}
                  alt={blossom}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <h3 className="text-xl font-semibold">
                  {data.nummer}. {blossom}
                </h3>
              </div>
              <p>
                <strong>Deutsch:</strong> {data.deutsch}
              </p>
              <p>
                <strong>Gefühlsgruppe:</strong> {data.gruppe}
              </p>
              <p>
                <strong>Affirmation:</strong> {data.affirmation}
              </p>
            </div>
          );
        })}
      </div>
      <button
        onClick={onReset}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
      >
        Neue Auswahl
      </button>
    </div>
  );
};

export default Results;

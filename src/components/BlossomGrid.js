import React from "react";

const BlossomGrid = ({ blossoms, selectedBlossoms, onBlossomSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {blossoms.map((blossom) => (
        <div
          key={blossom}
          className={`p-4 rounded-lg cursor-pointer transition-all ${
            selectedBlossoms.includes(blossom)
              ? "bg-blue-100 shadow-md"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => onBlossomSelect(blossom)}
        >
          <img
            src={`/images/blossoms/${blossom.toLowerCase().replace(/\s+/g, "_")}.png`}
            alt={blossom}
            className="w-full h-24 object-cover rounded-md mb-2"
          />
          <p className="text-center font-medium">{blossom}</p>
        </div>
      ))}
    </div>
  );
};

export default BlossomGrid;

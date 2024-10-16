import React from "react";
import { blossomData } from "../../data/blossomData";
import BlossomItem from "./BlossomItem";

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
          <div className="w-full h-24 mb-2">
            <BlossomItem
              blossom={blossom}
              showNumber={true}
              blossomData={blossomData}
            />
          </div>
          {/* <p className="text-center font-medium">{blossom}</p> */}
        </div>
      ))}
    </div>
  );
};

export default BlossomGrid;

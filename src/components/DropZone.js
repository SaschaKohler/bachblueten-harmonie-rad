import React from "react";
import { useTransition, animated } from "@react-spring/web";
import BlossomItem from "./blossom/BlossomItem";
import { blossomData } from "../data/blossomData";

const DropZone = ({ selectedBlossoms, onBlossomRemove }) => {
  console.log(selectedBlossoms);
  const transitions = useTransition(selectedBlossoms, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 300, friction: 20 },
  });

  return (
    <div className="min-h-24 border-2 border-dashed border-blue-300 rounded-lg p-4 flex flex-wrap gap-2">
      {transitions((style, blossom) => (
        <animated.div
          style={style}
          className="bg-blue-50 rounded-full px-3 py-1 flex items-center"
          key={blossom}
        >
          <div className="w-20 h-20 mr-2">
            <BlossomItem
              blossom={blossom}
              showName={false}
              blossomData={blossomData}
            />
          </div>
          <span className="mr-2">{blossom}</span>
          <button
            onClick={() => onBlossomRemove(blossom)}
            className="text-red-500 font-bold"
          >
            ×
          </button>
        </animated.div>
      ))}
    </div>
  );
};

export default DropZone;

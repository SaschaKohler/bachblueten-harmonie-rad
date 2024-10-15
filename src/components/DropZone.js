import React from "react";
import { useTransition, animated } from "@react-spring/web";

const DropZone = ({ selectedBlossoms, onBlossomRemove }) => {
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
          <img
            src={`/images/blossoms/${blossom.toLowerCase().replace(/\s+/g, "_")}.png`}
            alt={blossom}
            className="w-6 h-6 rounded-full mr-2"
          />
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

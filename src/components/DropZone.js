import React, { useCallback } from "react";
import { useDrop } from "react-dnd";
import { useTransition, animated, useSpring } from "react-spring";
import styled from "styled-components";

const DropArea = styled.div`
  min-height: 100px;
  border: 2px dashed #4682b4;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SelectedBlossom = styled(animated.div)`
  display: flex;
  align-items: center;
  background-color: #fffaf0;
  padding: 5px 10px;
  border-radius: 20px;
  margin: 5px;
`;

function DropZone({ selectedBlossoms, onBlossomRemove, onBlossomAdd }) {
  const handleDrop = useCallback(
    (item) => {
      onBlossomAdd(item.name);
    },
    [onBlossomAdd],
  );
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "blossom",
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const springProps = useSpring({
    backgroundColor: isOver ? "#e6f2ff" : "transparent",
    borderColor: isOver ? "#4682B4" : "#c0c0c0",
  });
  const transitions = useTransition(selectedBlossoms, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 300, friction: 20 },
  });

  return (
    <DropArea ref={drop} style={springProps}>
      {transitions((style, blossom) => (
        <SelectedBlossom key={blossom} style={style}>
          <img
            src={`/images/blossoms/${blossom.toLowerCase().replace(/\s+/g, "_")}.png`}
            alt={blossom}
            width="30"
            height="30"
            style={{ borderRadius: "50%", marginRight: "10px" }}
          />
          <span>{blossom}</span>
          <button
            onClick={() => onBlossomRemove(blossom)}
            style={{
              marginLeft: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </SelectedBlossom>
      ))}
    </DropArea>
  );
}

export default DropZone;

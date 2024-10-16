import React from "react";
import { useDrag } from "react-dnd";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

const BlossomItem = styled(animated.div)`
  cursor: move;
  margin: 5px;
  text-align: center;
`;

const BlossomImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

function DraggableBlossom({ blossom, onBlossomAdd }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "blossom",
    item: { name: blossom },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onBlossomAdd(item.name);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const springProps = useSpring({
    scale: isDragging ? 1.1 : 1,
    opacity: isDragging ? 0.8 : 1,
    boxShadow: isDragging
      ? "0px 10px 20px rgba(0,0,0,0.2)"
      : "0px 5px 10px rgba(0,0,0,0.1)",
    config: { mass: 1, tension: 500, friction: 20 },
  });

  return (
    <BlossomItem ref={drag} style={springProps}>
      <BlossomImage
        src={`/images/blossoms/${blossom.toLowerCase().replace(/\s+/g, "_")}.png`}
        alt={blossom}
      />
      <p>{blossom}</p>
    </BlossomItem>
  );
}

export default DraggableBlossom;

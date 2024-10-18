import React from "react";
import { useDrag } from "react-dnd";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { BlossomItem, BlossomImage } from "../../styles/HarmonyWheelStyles";
// const BlossomItem = styled(animated.div)`
//   cursor: pointer;
//   margin: 5px;
//   text-align: center;
//   opacity: ${(props) => (props.isSelected ? 0.5 : 1)};
// `;
//
// const BlossomImage = styled.img`
//   width: 80px;
//   height: 80px;
//   border-radius: 50%;
// `;

function Blossom({ blossom, isSelected, onSelect }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "blossom",
    item: { name: blossom },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const springProps = useSpring({
    scale: isSelected ? 0.9 : isDragging ? 1.1 : 1,
    opacity: isDragging ? 0.7 : isSelected ? 0.5 : 1,
    config: { mass: 1, tension: 500, friction: 20 },
  });

  return (
    <BlossomItem
      ref={drag}
      style={springProps}
      isSelected={isSelected}
      onClick={() => onSelect(blossom)}
    >
      <BlossomImage
        src={`/images/blossoms/${blossom.toLowerCase().replace(/\s+/g, "_")}.png`}
        alt={blossom}
      />
      <p>{blossom}</p>
    </BlossomItem>
  );
}

export default Blossom;

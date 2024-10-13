import React from "react";
import { useTrail, animated } from "react-spring";
import styled from "styled-components";
import Blossom from "./Blossom";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 15px;
  padding: 20px;
`;

function BlossomGrid({ blossoms, selectedBlossoms, onBlossomSelect }) {
  const trail = useTrail(blossoms.length, {
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
  });

  return (
    <Grid>
      {trail.map((style, index) => (
        <animated.div key={blossoms[index]} style={style}>
          <Blossom
            blossom={blossoms[index]}
            isSelected={selectedBlossoms.includes(blossoms[index])}
            onSelect={() => onBlossomSelect(blossoms[index])}
          />
        </animated.div>
      ))}
    </Grid>
  );
}

export default BlossomGrid;

import React from "react";
import styled from "styled-components";
import { useTrail, animated } from "react-spring";

const ResultContainer = styled.div`
  margin-top: 20px;
`;

const BlossomResult = styled(animated.div)`
  display: flex;
  align-items: start;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const BlossomImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
`;

const BlossomInfo = styled.div`
  flex: 1;
`;

const Results = ({ selectedBlossoms, blossomData, onReset }) => {
  const trail = useTrail(selectedBlossoms.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  return (
    <ResultContainer>
      <h2>Ihre Bachblüten Auswahl</h2>
      {trail.map((props, index) => {
        const blossom = selectedBlossoms[index];
        const data = blossomData[blossom];
        return (
          <BlossomResult key={blossom} style={props}>
            <BlossomImage
              src={`/images/blossoms/${blossom.toLowerCase().replace(/\s+/g, "_")}.png`}
              alt={blossom}
            />
            <BlossomInfo>
              <h3>
                {data.nummer}. {blossom}
              </h3>
              <p>
                <strong>Deutsch:</strong> {data.deutsch}
              </p>
              <p>
                <strong>Gefühlsgruppe:</strong> {data.gruppe}
              </p>
              <p>
                <strong>Affirmation:</strong> {data.affirmation}
              </p>
            </BlossomInfo>
          </BlossomResult>
        );
      })}
      <button onClick={onReset}>Neue Auswahl</button>
    </ResultContainer>
  );
};

export default Results;

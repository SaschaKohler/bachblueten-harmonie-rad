import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Card = styled(animated.div)`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin-left: 19px;
`;

const Title = styled.h1`
  color: #4682b4;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #333;
  font-size: 0.9rem;
`;

const InfoCard = ({ sector }) => {
  const springProps = useSpring({
    opacity: sector ? 1 : 0,
    transform: sector ? "translateY(0)" : "translateY(20px)",
    config: { tension: 300, friction: 20 },
  });

  if (!sector) return null;

  return (
    <Card style={springProps}>
      <Title>{sector.group}</Title>
      <Description>{sector.description}</Description>
    </Card>
  );
};

export default InfoCard;

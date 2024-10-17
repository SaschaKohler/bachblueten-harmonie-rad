import { styled } from "styled-components";
import { animated } from "react-spring";

export const WheelContainer = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
  margin: 0 auto;
`;

export const Wheel = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid transparent;
  position: relative;
`;

export const SectorBase = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  left: 50%;
  top: 50%;
  transform-origin: 0% 0%;
`;

export const AnimatedSectorContent = styled(animated.div)`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  transform-origin: 0% 0%;
`;

export const Center = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Satisfy", cursive;
  font-size: 1.2rem;
  color: #4682b4;
  z-index: 10;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
export const WheelAndInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
`;

export const AnimatedInfoPanel = styled(animated.div)`
  width: 300px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
export const InfoTitle = styled.h3`
  margin-top: 0;
  color: #333;
  font-size: 1.2em;
`;

export const InfoDescription = styled.p`
  color: #666;
  font-size: 0.9em;
  line-height: 1.5;
`;

export const BlossomList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
`;

export const BlossomItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const BlossomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const BlossomImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
`;

export const BlossomNumber = styled.span`
  font-size: 0.8em;
  color: #666;
`;

export const BlossomName = styled.span`
  margin-top: 5px;
  font-weight: medium;
`;

import styled from "styled-components";

const Container = styled.div`
  width: 550px;
  height: 750px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const Display = styled.span`
  font-weight: bold;
  font-size: 2em;
  background-color: #f0f0f0;
  color: #000;
`;

const CellsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;
export default {
  Container,
  Display,
  CellsContainer,
};

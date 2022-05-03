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
  height: 55px;
  padding: 10px 10px;
`;

const CellsContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
`;
const Row = styled.div`
  display: flex;
  border: 1px solid red;
`;
const Cell = styled.button`
  display: flex;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  span {
    margin: auto;
  }
`;
export default {
  Container,
  Display,
  CellsContainer,
  Row,
  Cell,
};

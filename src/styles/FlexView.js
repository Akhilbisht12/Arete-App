import styled from "styled-components/native";

const RowBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const RowStart = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const RowEven = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ColumnCenter = styled.View`
  align-items: center;
  justify-content: center;
`;
const ColumnStart = styled.View`
  align-items: flex-start;
`;
const ColumnEvenly = styled.View`
  justify-content: space-evenly;
`;
export {
  RowBetween,
  Row,
  ColumnCenter,
  ColumnEvenly,
  ColumnStart,
  RowStart,
  RowEven,
};

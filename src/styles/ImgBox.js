import styled from "styled-components/native";

const ImgBox = styled.View`
  margin-right: 4px;
  padding: 2px;
  height: ${(props) => (props.circular ? "60px" : "40px")};
  width: ${(props) => (props.circular ? "60px" : "40px")};
  background-color: olive;
  border-radius: ${(props) => (props.circular ? "30px" : "10px")};
  align-items: center;
  justify-content: center;
`;
export default ImgBox;

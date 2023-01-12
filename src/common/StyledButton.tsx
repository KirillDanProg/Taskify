import styled from "styled-components";

export const StyledButton = styled.button`
  all: unset;
  font-weight: bold;
  font-size: 14px;
  color: ${props => props.theme.mainColor};
  cursor: pointer;

  &:active {
    color: initial;
    text-decoration: none;
    background-color: #fff;
    transition: 0.4s;
    border-radius: 10px;
  }
`;



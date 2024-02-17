import styled from "styled-components";

export const StyledButton = styled.button`
  all: unset;
  font-weight: bold;
  font-size: 14px;
  color: ${(props) => props.theme.mainColor};
  cursor: pointer;

  &:enabled:active {
    color: ${(props) => props.theme.textColor};
    text-decoration: none;
    transition: 0.4s;
    border-radius: 10px;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

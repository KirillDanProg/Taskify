import styled from "styled-components";

export const TodoAppWrapper = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.primary};
  transition: all 0.5s ease;
`
import s from "./Header.module.scss";
import styled from "styled-components";
import { LoginBtn } from "./LoginBtn";
import { Filter } from "components/Filter/Filter";
import { ReactNode } from "react";

const HeaderBox = styled.div`
  background-color: ${props => props.theme.header};

  &::after {
    background: radial-gradient(
      circle at 0 0,
      rgba(0, 0, 0, 0) 25px,
      ${props => props.theme.header} 0
    );
  }

  &::before {
    background: radial-gradient(
      circle at 0 0,
      rgba(0, 0, 0, 0) 25px,
      ${props => props.theme.header} 0
    );
  }
`;
const Header = (props: { children: ReactNode }) => {
  return (
    <HeaderBox className={s.header}>
      <Filter />
      <LoginBtn />
      {props.children}
    </HeaderBox>
  );
};

export default Header;

import React from 'react';
import styles from "./Header.module.scss"
import styled from "styled-components";
import {LoginBtn} from "../Login/LoginBtn";

const HeaderBox = styled.div`
  background-color: ${props => props.theme.header};

  &::after {
    background: radial-gradient(circle at 0 0, rgba(0, 0, 0, 0) 25px, ${props => props.theme.header} 0);
  }

  &::before {
    background: radial-gradient(circle at 0 0, rgba(0, 0, 0, 0) 25px, ${props => props.theme.header} 0);
  }
`
const Header = (props: { children: JSX.Element }) => {
    return (
        <HeaderBox className={styles.header}>
            <LoginBtn/>
            {props.children}
        </HeaderBox>
    );
};

export default Header;
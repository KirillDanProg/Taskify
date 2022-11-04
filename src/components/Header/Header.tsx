import React from 'react';
import styles from "./Header.module.scss"

const Header = (props: {children: JSX.Element}) => {
    return (
        <div className={styles.header}>
            <Logo />
            <h2>PWA TodoList</h2>
            <Login/>
            {props.children}
        </div>
    );
};

const Logo = () => {
    return (
        <div className={styles.logo}>
            LOGO
        </div>
    )
}
const Login = () => {
    return (
        <div>
            LOGIN
        </div>
    )
}
export default Header;
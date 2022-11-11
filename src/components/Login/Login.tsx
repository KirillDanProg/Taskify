import React from 'react';
import {useFormik} from 'formik';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup"
import styles from "./Login.module.scss"
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import styled from "styled-components";
import {loginTC} from "../../state/reducers/auth-reducer/auth-reduser";

const LoginTipBox = styled.div`
  color: ${props => props.theme.textColor};
  font-size: 20px;
  font-weight: bold;

`

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(4, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export const Login = () => {
    const dispatch = useAppDispatch()
    const captchaUrl = useAppSelector(state => state.auth.captchaUrl)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            captcha: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const email = values.email.trim()
            const password = values.password.trim()
            const captcha = values.captcha
            dispatch(loginTC({email, password, captcha}))
        },
    });

    return (
        <div className={styles.formBox}>
            <form onSubmit={formik.handleSubmit}>
                <LoginTipBox>
                    <div>TEST LOGIN DATA</div>
                    <div>Email: free@samuraijs.com</div>
                    <div>Password: free</div>
                </LoginTipBox>
                <TextField
                    required
                    focused={true}
                    label="Email"
                    variant="filled"
                    {...formik.getFieldProps("email")}
                />
                <TextField
                    required
                    focused={true}
                    label="Password"
                    variant="filled"
                    type="password"
                    {...formik.getFieldProps("password")}
                />

                <Button color="primary" variant="contained" fullWidth type="submit" sx={{cursor: "pointer"}}>
                    Submit
                </Button>
                {
                    captchaUrl
                        ? <>
                            <img alt={"captcha"} src={captchaUrl}/>
                            <TextField
                                required
                                focused={true}
                                label="captcha"
                                type="captcha"
                                {...formik.getFieldProps("captcha")}
                            />
                        </>
                        : null
                }
            </form>
        </div>
    );
};


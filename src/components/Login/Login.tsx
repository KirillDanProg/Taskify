import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup"
import styles from "./Login.module.scss"
import {useAppSelector} from "../../hooks/reduxHooks";
import styled from "styled-components";
import {useLazyGetCaptchaQuery, useLoginMutation} from "../../features/auth/authApi";
import {selectCaptchaUrl} from "../../features/selectors";

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
    const captchaUrl = useAppSelector(selectCaptchaUrl)

    const [getCaptcha] = useLazyGetCaptchaQuery()
    const [login, {data}] = useLoginMutation()
    const captchaError = data?.resultCode === 10
    useEffect(() => {
        if (captchaError) {
            debugger

            getCaptcha()
        }
    }, [captchaError])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            captcha: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            login(values)
        },
    });

    return (
        <div className={styles.formBox}>
            <form onSubmit={formik.handleSubmit}>
                <LoginTipBox>
                    <div>TEST LOGIN DATA</div>
                    <div>Email: testEmailReact@gmail.com</div>
                    <div>Password: test123!!!</div>
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


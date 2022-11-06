import React from 'react';
import { useFormik } from 'formik';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as yup from "yup"
import styles from "./Login.module.scss"
import {loginTC} from "../../state/reducers/auth-reducer/auth-reduser";
import {useAppDispatch} from "../../hooks/reduxHooks";
const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export const Login = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(loginTC(values))
        },
    });

    return (
        <div className={styles.formBox}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    required
                    focused={true}
                    label="Email"
                    {...formik.getFieldProps("email")}
                />
                <TextField
                    required
                    focused={true}
                    label="Password"
                    type="password"
                    {...formik.getFieldProps("password")}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};


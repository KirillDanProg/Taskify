import * as yup from "yup";
import styles from "./Login.module.scss";
import { useEffect } from "react";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";

import {
  useLazyGetCaptchaQuery,
  useLoginMutation,
} from "../../features/auth/authApi";
import { useAppSelector } from "hooks/reduxHooks";
import { Navigate, useNavigate } from "react-router-dom";
import { selectCaptchaUrl, selectIsAuth } from "features/auth/selectors";
import { todoApi } from "../../features/todos/todoApi";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export const Login = () => {
  const captchaUrl = useAppSelector(selectCaptchaUrl);
  const [getCaptcha] = useLazyGetCaptchaQuery();
  const [login, { data }] = useLoginMutation();
  const captchaError = data?.resultCode === 10;
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    if (captchaError) {
      getCaptcha();
    }
  }, [captchaError, getCaptcha]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      captcha: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.password = values.password.trim();
      await login(values);
    },
  });
  if (isAuth) {
    return <Navigate to='/' />;
  }
  return (
    <div className={styles.formBox}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          required
          focused={true}
          label='Email'
          variant='filled'
          {...formik.getFieldProps("email")}
        />
        <TextField
          required
          focused={true}
          label='Password'
          variant='filled'
          type='password'
          {...formik.getFieldProps("password")}
        />

        <Button
          color='primary'
          variant='contained'
          fullWidth
          type='submit'
          sx={{ cursor: "pointer" }}
        >
          Submit
        </Button>
        {captchaUrl && (
          <>
            <img alt={"captcha"} src={captchaUrl} />
            <TextField
              required
              focused={true}
              label='captcha'
              type='captcha'
              {...formik.getFieldProps("captcha")}
            />
          </>
        )}
      </form>
    </div>
  );
};

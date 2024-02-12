import * as yup from "yup";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import styles from "./Login.module.scss";
import { useEffect } from "react";
import { useFormik } from "formik";
import { TextField, Button, Link } from "@mui/material";
import {
  useLazyGetCaptchaQuery,
  useLoginMutation,
} from "../../features/auth/authApi";
import { useAppSelector } from "hooks/reduxHooks";
import { Navigate } from "react-router-dom";
import { selectCaptchaUrl, selectIsAuth } from "features/auth/selectors";

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
  const theme = useContext(ThemeContext);
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
  const textFieldStyle = {
    border: `4px solid ${theme.mainColor}`,
    borderRadius: "10px",
    backgroundColor: "transparent",
    color: "#fff",
  };

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
          InputLabelProps={{
            style: {
              color: theme.textColor,
            },
          }}
          InputProps={{
            disableUnderline: true,
            style: { color: theme.textColor },
          }}
          sx={textFieldStyle}
          {...formik.getFieldProps("email")}
        />
        <TextField
          required
          focused={true}
          label='Password'
          variant='filled'
          type='password'
          InputLabelProps={{
            style: {
              color: theme.textColor,
            },
          }}
          InputProps={{
            disableUnderline: true,
            style: { color: theme.textColor },
          }}
          sx={textFieldStyle}
          {...formik.getFieldProps("password")}
        />
        <Button
          variant='contained'
          fullWidth
          type='submit'
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            backgroundColor: theme.mainColor,
            "&:hover": {
              backgroundColor: theme.brightMainColor,
            },
          }}
        >
          Sign in
        </Button>
        <Link
          href='https://social-network.samuraijs.com/signUp'
          target='_blank'
        >
          Dont't have an account yet?
        </Link>
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

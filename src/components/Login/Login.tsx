import * as yup from "yup";
import { useContext, useEffect } from "react";
import { ThemeContext } from "styled-components";
import s from "./Login.module.scss";
import { useFormik } from "formik";
import { TextField, Button, Link } from "@mui/material";
import { useLazyGetCaptchaQuery, useLoginMutation, useMeQuery } from "../../features/auth/authApi";
import { useAppSelector } from "common/hooks/reduxHooks";
import { Navigate } from "react-router-dom";
import { selectCaptchaUrl } from "features/auth/selectors";

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export const Login = () => {
  const theme = useContext(ThemeContext);
  const captchaUrl = useAppSelector(selectCaptchaUrl);
  const [getCaptcha] = useLazyGetCaptchaQuery();
  const [login, { data: loginData }] = useLoginMutation();
  const { data: authMeData } = useMeQuery();
  const isAuth = authMeData?.id;
  const captchaError = loginData?.resultCode === 10;

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
    validationSchema,
    onSubmit: async values => {
      values.password = values.password.trim();
      await login(values);
    },
  });

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const textFieldInputPropsStyle = {
    borderRadius: "10px",
    backgroundColor: "transparent",
    color: theme.textColor,
    border: `4px solid ${theme.mainColor}`,
  };
  const inputProps = {
    disableUnderline: true,
    style: textFieldInputPropsStyle,
  };
  const inputLabelProps = {
    style: {
      color: theme.textColor,
    },
  };

  return (
    <div className={s.formBox}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          required
          focused={true}
          label="Email"
          autoComplete="off"
          variant="filled"
          InputLabelProps={inputLabelProps}
          InputProps={inputProps}
          {...formik.getFieldProps("email")}
          error={!!formik.errors.email && formik.touched.email}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          required
          focused={true}
          label="Password"
          variant="filled"
          type="password"
          InputLabelProps={inputLabelProps}
          InputProps={inputProps}
          {...formik.getFieldProps("password")}
          error={!!formik.errors.password && formik.touched.password}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={Object.keys(formik.errors).length > 0}
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
          className={s.registerLink}
          href="https://social-network.samuraijs.com/signUp"
          target="_blank"
        >
          Don&apos; t have an account yet?
        </Link>
        {captchaUrl && (
          <>
            <img alt={"captcha"} src={captchaUrl} />
            <TextField
              required
              focused={true}
              label="captcha"
              type="captcha"
              {...formik.getFieldProps("captcha")}
            />
          </>
        )}
      </form>
    </div>
  );
};

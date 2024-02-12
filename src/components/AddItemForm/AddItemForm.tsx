import { FC, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import styles from "./AddItemForm.module.scss";
import { StyledButton } from "../../common/StyledButton";
import { StyledTextField } from "../../common/StyledTextField";

type ErrorsType = {
  title: string;
};
type AddItemFormType = {
  callback: (value: string) => void;
  placeholder: string;
};
export const AddItemForm: FC<AddItemFormType> = ({ callback, placeholder }) => {
  const [error, setError] = useState(false);
  const validate = (values: ErrorsType) => {
    if (!values.title) {
      setError(true);
    } else {
      error && setError(false);
    }
  };
  const onSubmit = (
    values: ErrorsType,
    { setSubmitting, resetForm }: FormikHelpers<ErrorsType>
  ) => {
    callback(values.title);
    resetForm();
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{ title: "" }}
      validate={validate}
      onSubmit={onSubmit}
      validateOnBlur={false}
    >
      {(formik) => (
        <Form className={styles.addForm}>
          <StyledTextField>
            <TextField
              variant='standard'
              error={error}
              margin='dense'
              color={"primary"}
              label=''
              placeholder={placeholder}
              InputProps={{
                disableUnderline: true,
              }}
              {...formik.getFieldProps("title")}
            />
          </StyledTextField>
          <StyledButton type='submit' disabled={formik.isSubmitting}>
            <AddBoxIcon fontSize={"large"} />
          </StyledButton>
        </Form>
      )}
    </Formik>
  );
};

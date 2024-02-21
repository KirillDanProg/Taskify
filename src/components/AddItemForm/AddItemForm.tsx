import { type FC } from "react";
import { type FormikHelpers, useFormik } from "formik";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import s from "./AddItemForm.module.scss";
import { StyledButton } from "common/components/StyledButton";
import { StyledTextField } from "common/components/StyledTextField";
import * as yup from "yup";

const validationSchema = yup.object({
  title: yup.string().required("field is empty").max(100, "too long value"),
});

interface ErrorsType {
  title: string;
}
interface AddItemFormType {
  callback: (value: string) => void;
  placeholder: string;
}
export const AddItemForm: FC<AddItemFormType> = ({ callback, placeholder }) => {
  const { handleSubmit, getFieldProps, isSubmitting, errors, values } = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema,
    onSubmit: (values: ErrorsType, { setSubmitting, resetForm }: FormikHelpers<ErrorsType>) => {
      callback(values.title);
      resetForm();
      setSubmitting(false);
    },
  });

  const disabledButton = isSubmitting || !!errors.title || !values.title;
  return (
    <form onSubmit={handleSubmit} className={s.addForm}>
      <StyledTextField>
        <TextField
          fullWidth
          variant="standard"
          margin="dense"
          color={"primary"}
          placeholder={placeholder}
          InputProps={{
            disableUnderline: true,
          }}
          {...getFieldProps("title")}
        />
      </StyledTextField>
      <StyledButton type="submit" disabled={disabledButton}>
        <AddBoxIcon fontSize={"large"} />
      </StyledButton>
    </form>
  );
};

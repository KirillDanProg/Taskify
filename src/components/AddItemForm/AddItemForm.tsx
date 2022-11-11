import React, {FC, useState} from 'react';
import {Form, Formik, FormikHelpers} from "formik";
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import styles from "./AddItemForm.module.scss"
import {MyButton} from "../../common/Button";

type ErrorsType = {
    title: string
}
type AddItemFormType = {
    callback: (value: string) => void
    placeholder: string
}
export const AddItemForm: FC<AddItemFormType> = ({callback, placeholder}) => {
    const [error, setError] = useState(false)
    const validate = (values: ErrorsType) => {
        if (!values.title) {
            setError(true)
        } else {
           error && setError(false)
        }
    }
    const onSubmit = (values: ErrorsType, {setSubmitting, resetForm}: FormikHelpers<ErrorsType>) => {
        callback(values.title)
        resetForm()
        setSubmitting(false);
    }
    return (
        <Formik
            initialValues={{title: ""}}
            validate={validate}
            onSubmit={onSubmit}
            validateOnBlur={false}
        >
            {(formik) => (
                <Form className={styles.addForm}>
                    <TextField variant="standard"
                               error={error}
                               margin="dense"
                               color={'primary'}
                               label={error ? "Required" : placeholder}
                               {...formik.getFieldProps('title')}
                               sx={{
                                   backgroundColor: "#fff",
                                   borderRadius: "5px"
                               }}
                               InputLabelProps={{
                                   style: { color: '#909090d4', paddingLeft: "10%" },
                               }}
                    />
                    <MyButton type="submit" disabled={formik.isSubmitting}>
                        <AddBoxIcon fontSize={"medium"}/>
                    </MyButton>
                </Form>
            )}
        </Formik>
    )

}
//     const [inputValue, setValue] = useState(value)
//
//     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         setValue(e.currentTarget.value)
//     }
//     const onBlurHandler = () => {
//         if (inputValue.trim()) {
//             callback(inputValue)
//         } else {
//             setError()
//         }
//
//     }
//     const onEnterHandler = () => {
//
//     }
//
//     return (
//         <input value={inputValue}
//                onChange={onChangeHandler}
//                onBlur={onBlurHandler}
//                onKeyDown={onEnterHandler}
//         />
//     );
// };


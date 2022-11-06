import React, {ChangeEvent, FC, useState} from 'react';
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import TextField from "@mui/material/TextField";

type EditableFieldType = {
    value: string
    callback: (newValue: string) => void
}

export const EditableField: FC<EditableFieldType> = (props) => {

    const [value, setValue] = useState(props.value)

    const callbackHandler = () => {
        props.callback(value)
    }
    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <div className={"editableFieldBox"}>
            <SaveOutlinedIcon onClick={callbackHandler}/>
            <TextField variant={"outlined"}
                       autoFocus={true}
                       value={value}
                       onChange={changeValueHandler}
                       size={"small"}

            />
        </div>
    );
};


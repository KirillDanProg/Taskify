import React, { ChangeEvent, FC, useState } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { TextField } from "@mui/material";
import s from "./EditableField.module.scss";
type EditableFieldType = {
  value: string;
  callback: (newValue: string) => void;
  children: JSX.Element;
};

export const EditableField: FC<EditableFieldType> = (props) => {
  const [value, setValue] = useState(props.value);
  const [isEdit, setEdit] = useState(false);

  const callbackHandler = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    props.callback(value);
    setEdit(false);
  };
  const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const editModeHandler = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setEdit(true);
  };

  return (
    <div className={s.editableFieldBox}>
      {isEdit ? (
        // Edit field
        <>
          <SaveOutlinedIcon onClick={callbackHandler} />
          <TextField
            autoFocus={true}
            autoComplete='off'
            value={value}
            onChange={changeValueHandler}
            onClick={(e) => {
              e.stopPropagation();
            }}
            size={"small"}
            variant='standard'
            InputProps={{
              disableUnderline: true,
            }}
            className={s.editableInput}
          />
        </>
      ) : (
        // Title field
        <>
          <EditOutlinedIcon onClick={editModeHandler} />
          {props.children}
        </>
      )}
    </div>
  );
};

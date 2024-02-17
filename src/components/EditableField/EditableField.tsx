import React, { ChangeEvent, FC, useState } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { TextField } from "@mui/material";
import s from "./EditableField.module.scss";
import { Icon } from "common/components/icon/Icon";
type IconSideType = "right" | "left";
type EditableFieldType = {
  initialValue: string;
  callback: (newValue: string) => void;
  children: JSX.Element;
  iconSide?: IconSideType;
};

export const EditableField: FC<EditableFieldType> = (props) => {
  const { callback, initialValue, children, iconSide = "left" } = props;
  const [value, setValue] = useState(initialValue);
  const [isEdit, setEdit] = useState(false);

  const callbackHandler = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setEdit(false);
    if (initialValue === value) {
      return;
    }
    callback(value);
  };
  const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const editModeHandler = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setEdit(true);
  };

  return (
    <div className={`${s.editableFieldBox} ${s[iconSide]}`}>
      {isEdit ? (
        // Edit field
        <>
          <Icon>
            <SaveOutlinedIcon onClick={callbackHandler} />
          </Icon>
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
          <Icon>
            <EditOutlinedIcon onClick={editModeHandler} />
          </Icon>
          {children}
        </>
      )}
    </div>
  );
};

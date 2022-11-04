import React, {FC} from 'react';
import {ThemeModeType} from "../../../App";
import {Moon, Sun} from "./SetTheme";

type TodoPropsType = {
    theme: ThemeModeType
    setTheme: (value: ThemeModeType) => void
}
export const DarkModeSwitch: FC<TodoPropsType> = (props) => {

    return (
        <div>
            {props.theme === "light" ?
                <Moon setTheme={props.setTheme} theme={props.theme}/>
                :
                <Sun setTheme={props.setTheme} theme={props.theme}/>
            }
        </div>
    );
};


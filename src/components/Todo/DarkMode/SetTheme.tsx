import {ThemeModeType} from "../../../App";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import React, {FC} from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import {Button} from "../../../common/Button";

type ThemePropsType = {
    theme: ThemeModeType
    setTheme: (value: ThemeModeType) => void
}
export const Sun: FC<ThemePropsType> = ({setTheme, theme}) => {

    const setLightMode = () => {
        theme !== "light" && setTheme("light")
    }

    return (
        <Button  onClick={setLightMode}>
            <LightModeIcon/>
        </Button>
    )
}


export const Moon: FC<ThemePropsType> = ({setTheme, theme}) => {

    const setLightMode = () => {
        theme !== "dark" && setTheme("dark")
    }

    return (
        <Button  onClick={setLightMode}>
            <ModeNightIcon/>
        </Button>
    )

}

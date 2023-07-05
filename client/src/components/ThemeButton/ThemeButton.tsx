import { ChangeEvent, useState } from "react";
import Switch from "react-switch";
import './ThemeButton.scss'
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import styled, { blockStyle } from "../../utils/setDark";

const ThemeButton = () => {

  const theme = useSelector((state: RootState) => state.themeSlice.theme);
  const dispatch = useDispatch();

  const changeColour = () => {
    if (theme === "light") {
      dispatch({ type: "theme/changeTheme", payload: "dark" })
    }
    else dispatch({ type: "theme/changeTheme", payload: "light"})
  }

  return (
    <div className="themeButton" style={blockStyle(theme)}>
        <Switch 
          onChange={() => changeColour() }
          checked={theme === "light" ? false : true}
        />
    </div>
    )
}

export default ThemeButton
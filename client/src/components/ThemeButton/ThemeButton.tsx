import { ChangeEvent, useEffect, useRef, useState } from "react";
import Switch from "react-switch";
import './ThemeButton.scss'
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import styled, { blockStyle } from "../../utils/setDark";
import DayNight from "../../assets/photos/day-and-night-icon.svg"

const ThemeButton = () => {

  const theme = useSelector((state: RootState) => state.themeSlice.theme);
  const dispatch = useDispatch();

  const changeColour = () => {
    if (theme === "light") {
      dispatch({ type: "theme/changeTheme", payload: "dark" })
      if (imgRef.current !== null) {
        imgRef.current.style.transform = "rotate(180deg)"
      }
    }
    else {
      dispatch({ type: "theme/changeTheme", payload: "light"})
      if (imgRef.current !== null) {
        imgRef.current.style.transform = "rotate(0deg)"
      }
    }
  }

  const imgRef = useRef<HTMLImageElement | null>(null);

  const [rotate, setRotate] = useState("0deg");

  useEffect(() => {
    setRotate("-45deg")
  }, [])

  return (
    <div className="themeButton" style={blockStyle(theme)}>
    <div className="themeInfo">
      <p className="themeText"> Set theme to {theme === "dark" ? "light" : "dark" } </p>
      <div className="switch"> 
        <Switch 
          onChange={() => changeColour() }
          checked={theme === "light" ? false : true}
        />
      </div>
      <img ref={imgRef} 
      style={theme === "dark" ? {rotate: rotate} : {rotate: rotate} }
      className="themeImage" src={DayNight}
      onClick={() => changeColour()}
      />
    </div>
    </div>
    )
}

export default ThemeButton
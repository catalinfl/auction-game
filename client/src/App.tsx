import { Button } from "baseui/button"
import { useSelector, useDispatch } from "react-redux"
import { DarkTheme, LightTheme, ThemeProvider } from "baseui";
import Navbar from "./components/Navbar/Navbar";
import { RootState } from "./redux/store";

function App() {

  const dispatch = useDispatch();
  const theme: "light" | "dark" = useSelector((state: RootState) => state.themeSlice.theme);

  const changeColour = () => {
    if (theme === "light") {
      dispatch({ type: "theme/changeTheme", payload: "dark" })
    }
    else dispatch({ type: "theme/changeTheme", payload: "light"})
  }


  return (
    <>
      <div className="allNav"> 
      <Navbar />
      </div>
      <ThemeProvider theme={theme === "dark" ? DarkTheme : LightTheme}>
      <Button onClick={() => changeColour()}> Click </Button>
      <p> {theme} </p>
      </ThemeProvider>
    </>
  )
}

export default App

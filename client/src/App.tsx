import { useSelector, useDispatch } from "react-redux"
import './App.scss'
import { DarkTheme, LightTheme, ThemeProvider } from "baseui";
import Navbar from "./components/Navbar/Navbar";
import { RootState } from "./redux/store";
import WelcomeContainer from "./components/Welcome/WelcomeContainer";
import SeeContainers from "./components/SeeContainers/SeeContainers";
import ThemeButton from "./components/ThemeButton/ThemeButton";
import StartAuction from "./components/StartAuction/StartAuction";
import { useState } from "react";

function App() {

  const theme: "light" | "dark" = useSelector((state: RootState) => state.themeSlice.theme);


  const [themed, setThemed] = useState<"light" | "dark">(theme);

  return (
    <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme }> 
    <Navbar />
    <div className="principal">
      <div className="principal-flex">
        <WelcomeContainer theme={themed}/>
        <SeeContainers theme={themed}/>
      </div>
      <div className="secondary-flex">
        <ThemeButton theme={themed}/>
        <StartAuction theme={themed}/>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default App

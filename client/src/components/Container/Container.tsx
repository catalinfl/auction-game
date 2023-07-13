import InfoContainer from "./InfoContainer"
import './Container.scss';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import InputChestContainer from "./InputChestContainer";
import ChestContainer from "./ChestContainer";

const Container = () => {

  const theme = useSelector((state: RootState) => state.themeSlice.theme);

  

  return (
    <div className="container">
      <div className="containerContent">
        <InfoContainer theme={theme}/>
        <InputChestContainer theme={theme} />
        <ChestContainer theme={theme} />
      </div>
    </div>    
  )
}

export default Container
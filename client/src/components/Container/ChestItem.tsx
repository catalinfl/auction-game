
import { useSelector } from "react-redux"
import Image from "../../assets/photos/img.png"
import { GiCoins } from "react-icons/gi"
import { RootState } from "../../redux/store"

const ChestItem = () => {

  const theme = useSelector((state: RootState) => state.themeSlice.theme)


  return (
    <div className="chestItem" style={{
      backgroundColor: theme === "dark" ? "#1d6c8c" : "rgb(192, 254, 255)"
    }}>
        <img className="chestImage" src={Image} />
        <p className="infoRarity"> Rarity: Common </p>
        <p className="infoType"> Type: Container
        </p>
        <p className="infoTier"> Tier: 1 </p>
        <p className="infoCost"> Cost: 150 <GiCoins style={{color: "yellow"}}/> </p>
        <div className="buttonChestContainer">
        <button type="button" 
        style={{
          backgroundColor: theme === "light" ? "rgba(108, 222, 230, 0.995)" : "rgb(31, 60, 69)"
        }}
          className="openButton"> Open </button>
        <button type="button"
        style={{
          backgroundColor: theme === "light" ? "rgba(108, 222, 230, 0.995)" : "rgb(31, 60, 69)"
        }} className="openButton sell"> Sell </button>
        </div>
    </div>
  )
}

export default ChestItem
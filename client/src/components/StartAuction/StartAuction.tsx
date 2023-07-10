import './StartAuction.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { blockStyle } from '../../utils/setDark';
import AuctionImage from "../../assets/photos/svg1.svg"
import { Link } from 'react-router-dom';

const StartAuction = () => {
  
  const theme = useSelector((state: RootState) => state.themeSlice.theme);

  return (
  <div className="startAuction" style={blockStyle(theme)}>
    <div className="auctionContainer">
    <p className="startAuctionText"> Start now to compete in auctions, level up and earn tons of coins </p>
    <img src={AuctionImage} alt="auction" className="auctionImage"/>
    <div className="buttonContainer">     
    <Link style={{ textDecoration: 'none' }} to="/auctions">
    <button className="startAuctionButton" style={theme === "dark" ? {color: "white"} : {color: "black"}}> Go to auctions page </button>
    </Link>
    </div>
    </div>
  </div>
)
} 

export default StartAuction
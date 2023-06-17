import { useDispatch, useSelector } from 'react-redux';
import './__navbar.scss';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { GiOpenChest } from 'react-icons/gi';
import { RiAuctionLine } from 'react-icons/ri';
import Coin from "../../assets/photos/icons8-coin.svg"
import { Link } from 'react-router-dom';
import { removeCookie } from '../../utils/removeCookie';
import { UserStateType } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

type CSSType = {
    backgroundColor: string
    boxShadow?: string
    color?: string
}

const Navbar = () => {

    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.themeSlice.theme);

    const navigate = useNavigate();

    const user: UserStateType = useSelector((state: RootState) => state.authSlice);
    
    const blockStyle = (): CSSType => {
        if (theme === "light") {
            return {
                backgroundColor: "#a7e7f2",
                boxShadow: "0px 0px 20px 0px rgba(147, 146, 146, 0.75)"
            }
        }
        else return {
            backgroundColor: "#000000",
            color: "white"
        }
    }

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark");
            const p = document.querySelectorAll("p");
            p.forEach((item) => {
                item.classList.add("darkParagraph")
            })
        }
        else {
            document.body.classList.remove("dark");
            const p = document.querySelectorAll("p");
            p.forEach((item) => {
                item.classList.remove("darkParagraph")
            })
        }
    }, [theme])



    const logOut = () => {
        if (user.connected === true) {
            removeCookie("authorization");
            dispatch({ type: "auth/disconnect", payload: { connected: false } })
            navigate('/login');
        }
      }

      useEffect(() => {
        if (user.connected === false || user.connected === undefined) {
            navigate('/login');
        }
      }, [user])

    return (
    <div className="navbar">
        <div className="navbarContainer" style={blockStyle()}>
            <div className="navbarButtons">
                <div className="buttonItemContainer">
                    <Link to="/" style={{backgroundColor: "transparent", textDecoration: "none"}}> 
                    <button type="button" className="buttonItem"
                    style={{
                        color: theme === "light" ? "black" : "white",
                    }}> HOME <AiOutlineHome className="icon"/> 
                    </button>
                    </Link>
                </div>
                <div className="buttonItemContainer">
                    <Link to="/auctions" style={{backgroundColor: "transparent", textDecoration: "none"}}> 
                    <button type="button" className="buttonItem"
                    style={{
                        color: theme === "light" ? "black" : "white",
                    }}
                    > AUCTIONS <RiAuctionLine className="icon"/> </button>
                    </Link>
                </div>
                <div className="buttonItemContainer">
                    <Link to="/containers" style={{backgroundColor: "transparent", textDecoration: "none"}}>
                    <button type="button" className="buttonItem"
                    style={{
                        color: theme === "light" ? "black" : "white",
                    }}> MY CONTAINERS <GiOpenChest className="icon"/> </button>
                    </Link>
                </div>
            </div>
            <div className="infoContainer">
                <div className="userContainer"
                style={{
                    color: theme === "light" ? "black" : "white",
                    backgroundColor: theme === "dark" ? "#1d6c8c" : "#6fd6e8",
                    padding: '0.5rem 1rem',
                    borderRadius: '5px'
                }}
                >
                    <p> {user.username} </p>
                    <p> Level {user.level} </p>
                    <p> XP: {user.xp} </p>
                </div>
                <button className="buttonItem"
                style={{
                    color: theme === "light" ? "black" : "white",
                    backgroundColor: theme === "dark" ? "#1d6c8c" : "#6fd6e8"
                }}
                onClick={() => logOut()}
                > Logout </button>
                <div className="coinContainer"> 
                <p> Coins: {user.money} </p>
                <img className="coinImage" src={Coin} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar

import { useDispatch, useSelector } from 'react-redux';
import './__navbar.scss';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { GiOpenChest } from 'react-icons/gi';
import { RiAuctionLine } from 'react-icons/ri';
import Coin from "../../assets/photos/icons8-coin.svg"
import { Link, redirect } from 'react-router-dom';
import { UserStateType } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import removeCookie from '../../utils/removeCookie';
import { GiHamburgerMenu } from 'react-icons/gi';
import getCookie from '../../utils/getCookie';

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
            backgroundColor: "#474242",
            color: "white"
        }
    }



    const isAuth = useSelector((state: RootState) => state.authSlice.connected);

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

    useEffect(() => {
        const cookie = getCookie("isLoggedIn");
        if (cookie === null) {
            redirect("/login");
        }
    }, [])

    const logOut = (isAuth: boolean) => {
        if (isAuth) {
            if (user.connected === true) {
                removeCookie("isLoggedIn");
                dispatch({ type: "auth/disconnect", payload: { connected: false } })
                navigate('/login');
            }
        }
        else {
            navigate('/login');
        }
      }

      useEffect(() => {
        if (user.connected === false || user.connected === undefined) {
            setTimeout(() => {
                navigate('/login');
            }, 30000)
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
                <div className="buttonItemContainer">
                    <GiHamburgerMenu className="hamburger" />
                </div>
            </div>
            <div className="infoContainer">
                { 
                isAuth ? 
                <div className="userContainer"
                style={{
                    color: theme === "light" ? "black" : "white",
                    backgroundColor: theme === "dark" ? "#1d6c8c" : "#6fd6e8",
                    padding: '0.5rem 1rem',
                    borderRadius: '5px'
                }}
                >
                    <> 
                    <p> {user.username} </p>
                    <p> Level {user.level} </p>
                    <p> XP: {user.xp} </p>
                    </>  
                </div>
                    : null
                }
                <button className="buttonItem"
                style={{
                    color: theme === "light" ? "black" : "white",
                    backgroundColor: theme === "dark" ? "#1d6c8c" : "#6fd6e8"
                }}
                onClick={() => logOut(isAuth)}
                > { isAuth ? "Logout" : "Login"} </button>
                {isAuth ?
                 <div className="coinContainer"> 
                <p> Coins: {user.money} </p>
                <img className="coinImage" src={Coin} />
                </div> 
                : null}
            </div>
        </div>
    </div>
  )
}

export default Navbar

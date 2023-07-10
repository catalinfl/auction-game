import { useSelector } from 'react-redux';
import './WelcomeContainer.scss'
import { RootState } from '../../redux/store';
import { useState } from 'react';
import styled, { blockStyle } from '../../utils/setDark';
import { UserStateType } from '../../redux/slices/authSlice';
import CoinWelcome from "../../assets/photos/icons8-coin-96.png"
import { ProgressBar } from "baseui/progress-bar"


const WelcomeContainer = () => {
  const user = useSelector((state: RootState) => state.authSlice);
  const [userState, setUserState] = useState<UserStateType>(user);
  const theme = useSelector((state: RootState) => state.themeSlice.theme);
  
  const maxXP = userState.level <= 10 ? 1000 * userState.level : 2000 * userState.level;

  return (
    <div className="welcomeContainer" style={blockStyle(theme)}>
        {userState.connected ? 
        <> 
        <div className="welcomeMessageContainer">
          <p className="welcomeMessageText"> Welcome, {userState.username} </p> 
        </div>        
        <div className="welcomeInfoContainer">
          <p className="welcomeInfoText"> You have {userState.money} </p> <img className="welcomeInfoImage" src={CoinWelcome} alt="coin" />
          <p className="welcomeInfoText"> coins. </p> 
        </div>
        <div className="levelContainer">
          <p className="levelText"> Level {userState.level} </p>
          <ProgressBar
            overrides={{
              BarProgress: {
                style: ({$theme}) => ({
                  backgroundColor: theme === "dark" ? "white" : "rgb(12, 130, 157)"
                }),
              },
            }}
          value={Math.floor(userState.xp/maxXP * 100)}
          />
          <p className="xpInfo"> {userState.xp}/{maxXP} XP</p>
        </div>
        </>
        :
        <>
        <div className="guestContainer">
          <p> Login to start your journey in competing in auctions </p>
        </div>
        </>
        }
    </div>
  )
}

export default WelcomeContainer
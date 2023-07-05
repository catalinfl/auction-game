import { useSelector } from 'react-redux';
import './WelcomeContainer.scss'
import { RootState } from '../../redux/store';
import { useState } from 'react';
import styled, { blockStyle } from '../../utils/setDark';
const WelcomeContainer = () => {
  
  const user = useSelector((state: RootState) => state.authSlice);
  const [userState, setUserState] = useState(user);
  const theme = useSelector((state: RootState) => state.themeSlice.theme);

  return (
    <div className="welcomeContainer" style={blockStyle(theme)}>
        <div className="welcomeMessageContainer">
          <p className="welcomeMessageText"> Welcome, {userState.username} </p> 
        </div>
        <div className="welcomeInfoContainer">
          <p className="welcomeInfoText"> You have {userState.money} coins </p>
        </div>
    </div>
  )
}

export default WelcomeContainer
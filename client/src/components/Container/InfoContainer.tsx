import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { ThemeStateType } from '../../redux/slices/themeSlice';



const InfoContainer = ({theme}: { theme: ThemeStateType }) => {

  const user = useSelector((state: RootState) => state.authSlice);

  return (
    <div className="infoContainer" style={{
        backgroundColor: theme === "dark" ? "#474242" : "rgb(192, 254, 255)",
    }}>
        <p className="containerInfoText"> You opened {user.cratesOpened} in total. You have {user.crates.length !== null || undefined ? user.crates.length : 0} crates/containers to open. </p>
    </div>  
    )
}

export default InfoContainer
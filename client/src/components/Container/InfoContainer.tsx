import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { ThemeStateType } from '../../redux/slices/themeSlice';

type InfoContainerProps = {
    theme: ThemeStateType,
    crates: number,
    cratesOpened: number
}

const InfoContainer = ({ theme, crates, cratesOpened }: InfoContainerProps) => {
  return (
    <div className="infoContainer" style={{
        backgroundColor: theme === "dark" ? "#474242" : "rgb(192, 254, 255)",
    }}>
        <p className="containerInfoText"> You opened {cratesOpened} in total. You have {crates !== null || undefined ? crates : 0} crates/containers to open. </p>
    </div>  
    )
}

export default InfoContainer
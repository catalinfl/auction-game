import './SeeContainers.scss'
import styled, { blockStyle } from '../../utils/setDark'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


const SeeContainers = () => {

  const theme = useSelector((state: RootState) => state.themeSlice.theme);
  
  return (
    <div className="seeContainer"
    style={blockStyle(theme)}
    >
        <p> test </p>
    </div>
  )
}

export default SeeContainers
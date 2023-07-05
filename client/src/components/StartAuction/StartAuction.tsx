import './StartAuction.scss'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { blockStyle } from '../../utils/setDark';


const StartAuction = () => {
  
  const theme = useSelector((state: RootState) => state.themeSlice.theme);

  return (
  <div className="startAuction" style={blockStyle(theme)}>
    <p> Start auction </p>
  </div>
)
} 

export default StartAuction
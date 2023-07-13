import './Container.scss'
import { ThemeStateType } from '../../redux/slices/themeSlice'
import ChestItem from './ChestItem'
import { Crate } from '../../redux/slices/authSlice'

const ChestContainer = ({ theme, crates }: { theme: ThemeStateType, crates: Crate[]}) => {
  return (
    <div className="chestContainer" style={{
        backgroundColor: theme === "dark" ? "#474242" : "rgb(192, 254, 255)"
    }}>
        <div className="centered">
            <div className="chestItems">
                {crates.map((crate: Crate) => {
                    return (
                        <ChestItem crate={crate} />
                    )
                })}
            </div>
        </div>
    </div>
    )
}

export default ChestContainer
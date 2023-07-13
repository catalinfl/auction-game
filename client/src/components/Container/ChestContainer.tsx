import './Container.scss'
import { ThemeStateType } from '../../redux/slices/themeSlice'
import ChestItem from './ChestItem'

const ChestContainer = ({ theme }: { theme: ThemeStateType }) => {
  return (
    <div className="chestContainer" style={{
        backgroundColor: theme === "dark" ? "#474242" : "rgb(192, 254, 255)"
    }}>
        <div className="centered">
            <div className="chestItems">
                <ChestItem />
                <ChestItem />
                <ChestItem />
                <ChestItem />
                <ChestItem />
                <ChestItem />
                <ChestItem />
                <ChestItem />


            </div>
        </div>
    </div>
    )
}

export default ChestContainer
import './Container.scss'
import { ThemeStateType } from '../../redux/slices/themeSlice'
import ChestItem from './ChestItem'
import { Crate } from '../../redux/slices/authSlice'
import { useEffect, useState } from 'react'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'


const ChestContainer = ({ theme, crates }: { theme: ThemeStateType, crates: Crate[]}) => {

    const containers = useSelector((state: RootState) => state.containerSlice.crates)

    const [cratesToRender, setCratesToRender] = useState<Crate[]>(crates)
    
    useEffect(() => {
        setCratesToRender(containers) 
    }, [crates, containers])
    
    

  return (
    <div className="chestContainer" style={{
        backgroundColor: theme === "dark" ? "#474242" : "rgb(192, 254, 255)"
    }}>
        { cratesToRender.length !== 0 ? (
        <div className="centered">
            <div className="chestItems">
               {cratesToRender.map((crate: Crate) => {
                    return (
                        <> 
                        <ChestItem crate={crate} />
                        </>
                        )
                })}
            </div>
        </div>
        ) :
        <div className="contanierNoDisplay"> 
        <p style={{ color: "white", fontSize: '1.5rem', fontFamily: 'DosisBold' }}> No items to display </p> 
        </div>
        }
    </div>
    )
}

export default ChestContainer
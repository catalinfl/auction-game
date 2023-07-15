
import { useDispatch, useSelector } from "react-redux"
import Image from "../../assets/photos/img.png"
import { GiCoins } from "react-icons/gi"
import { RootState } from "../../redux/store"
import { Crate, sellChest } from "../../redux/slices/authSlice"
import { ModalHeader, ModalBody, ModalFooter, ModalButton, Modal, SIZE, ROLE } from "baseui/modal"
import { useEffect, useState } from "react"
import { KIND as ButtonKind } from "baseui/button";
import axios from "axios"
import { fetchCratesAfterDelete } from "../../redux/slices/containerSlice"

const ChestItem = ({ crate }: { crate: Crate } ) => {

  const theme = useSelector((state: RootState) => state.themeSlice.theme)
  const [isOpen, setIsOpen] = useState(false);
  const containers = useSelector((state: RootState) => state.containerSlice.crates)
  const dispatch = useDispatch();

  const onSell = () => {
    axios.delete(`http://localhost:3000/api/crates/${crate._id}`, { withCredentials: true })
    setIsOpen(false)
    const newContainers = containers.filter((container: Crate) => container._id !== crate._id)
    dispatch(fetchCratesAfterDelete(newContainers));
    dispatch(sellChest({ coins: crate.cost / 2, crates: containers }))
  }

  return (
    <div className="chestItem" key={crate._id} style={{
      backgroundColor: theme === "dark" ? "#1d6c8c" : "rgb(92, 252, 255)",
      color: theme === "dark" ? "white" : "black"
    }}>
        <img className="chestImage" src={Image} />
        <p className="infoRarity"> Rarity: {crate?.rarity?.slice(0, 1).toUpperCase() + crate?.rarity?.slice(1, crate.rarity.length)} </p>
        <p className="infoType"> Type: {crate?.type?.slice(0, 1).toUpperCase() + crate?.type?.slice(1, crate.type.length)}
        </p>
        <p className="infoTier"> Tier: {crate.type} </p>
        <p className="infoCost"> Cost: {crate.cost} <GiCoins style={{color: "yellow"}}/> </p>
        <div className="buttonChestContainer">
        <button type="button" 
        style={{
          backgroundColor: theme === "light" ? "rgba(108, 222, 230, 0.995)" : "rgb(31, 60, 69)"
        }}
          className="openButton"> Open </button>
        <button type="button"
        style={{
          backgroundColor: theme === "light" ? "rgba(108, 222, 230, 0.995)" : "rgb(31, 60, 69)"
        }} className="openButton sell" onClick={() => setIsOpen(true)}> Sell </button>
        </div>
        <div className="modalContainer">
          <Modal
          onClose={() => setIsOpen(false)}
          closeable
          isOpen={isOpen}
          animate
          autoFocus
          size={SIZE.default}
          role={ROLE.dialog}
          overrides={{ 
            Dialog: {
              style: () => ({
                backgroundColor: 'rgb(15, 37, 60)'
              })
            },
            DialogContainer: {
              style: () => ({
                backgroundColor: 'hsla(184, 55.5%, 5.294117647058823%, 0.596)'
              })
            },
            Close: {
              style: () => ({
                backgroundColor: 'rgb(97, 153, 210)'
              })
            }
          }}
        >
          <ModalHeader style={{
            color: "white",
            fontFamily: "DosisBold",
            textAlign: "center",
            fontSize: "1.5rem"
          }}> Selling item </ModalHeader>
          <ModalBody style={{ 
            color: "white", 
            fontFamily: "DosisBold", 
            fontSize: "1.2rem",
            display: 'flex',
            alignItems: 'center',
            gap: "0.25rem",
            marginTop: '2rem',
            textAlign: "center"
            }}>
            Are you sure you want to sell this item for {crate.cost/2} <GiCoins />?
          </ModalBody>
          <ModalFooter>
            <ModalButton kind={ButtonKind.secondary} style={{
              backgroundColor: "rgb(97, 153, 210)",
              fontFamily: "DosisRegular"
            }}
            onClick={() => setIsOpen(false)}
            >
              Cancel
            </ModalButton>
            <ModalButton
            style={{
              backgroundColor: "rgb(97, 153, 210)",
              fontFamily: "DosisRegular"
            }}
            onClick={() => onSell()}
            > Ok </ModalButton>
          </ModalFooter>
          </Modal>
        </div>
    </div>
  )
}

export default ChestItem
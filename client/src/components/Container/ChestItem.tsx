
import { useSelector } from "react-redux"
import Image from "../../assets/photos/img.png"
import { GiCoins } from "react-icons/gi"
import { RootState } from "../../redux/store"
import { Crate } from "../../redux/slices/authSlice"
import { ModalHeader, ModalBody, ModalFooter, ModalButton, Modal, SIZE, ROLE } from "baseui/modal"
import { useState } from "react"
import { KIND as ButtonKind } from "baseui/button";

const ChestItem = ({ crate }: { crate: Crate } ) => {

  const theme = useSelector((state: RootState) => state.themeSlice.theme)
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="chestItem" style={{
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
        }} className="openButton sell"> Sell </button>
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
    >
      <ModalHeader>Hello world</ModalHeader>
      <ModalBody>
        Proin ut dui sed metus pharetra hend rerit vel non
        mi. Nulla ornare faucibus ex, non facilisis nisl.
        Maecenas aliquet mauris ut tempus.
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={ButtonKind.tertiary}>
          Cancel
        </ModalButton>
        <ModalButton>Okay</ModalButton>
      </ModalFooter>
    </Modal>
           </div>
    </div>
  )
}

export default ChestItem
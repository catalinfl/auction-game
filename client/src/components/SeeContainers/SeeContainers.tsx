import './SeeContainers.scss'
import { blockStyle } from '../../utils/setDark'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Container from "../../assets/photos/shippingcontainer.png"
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


const SeeContainers = () => {

  const theme = useSelector((state: RootState) => state.themeSlice.theme);
  
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imageRef.current !== null) {
      imageRef.current.addEventListener("mouseover", () => {
        imageRef.current!.style.transform = "scale(1.1) translateY(-2rem)"
      })
      imageRef.current.addEventListener("mouseout", () => {
        imageRef.current!.style.transform = "scale(1)"
      })
    }
    return () => {
      if (imageRef.current !== null) {
        imageRef.current.removeEventListener("mouseover", () => {
          imageRef.current!.style.transform = "scale(1.1) translateY(-2rem)"
        })
        imageRef.current.removeEventListener("mouseout", () => {
          imageRef.current!.style.transform = "scale(1)"
        })
      }
    }
  }, [])


  return (
    <div className="seeContainer"
    style={blockStyle(theme)}
    >
      <p className="seeContainerText"> See all the containers you bought from auctions </p>
      <div className="containerforContImg">
      <Link style={{ textDecoration: 'none' }} to="/containers">
      <img ref={imageRef} className="containerImage" alt="test" src={Container} />
      </Link>
      </div>
    </div>
  )
}

export default SeeContainers
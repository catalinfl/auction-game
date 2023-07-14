import InfoContainer from "./InfoContainer"
import './Container.scss';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import InputChestContainer from "./InputChestContainer";
import ChestContainer from "./ChestContainer";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const Container = () => {

  const theme = useSelector((state: RootState) => state.themeSlice.theme);
  const user = useSelector((state: RootState) => state.authSlice);

  const [crates, setCrates] = useState<any>([]);
  const [maximumValue, setMaximumValue] = useState<number>(100);
  const dispatch = useDispatch();


  useEffect(() => {
    axios.get(`http://localhost:3000/api/crates/${user?._id}`, {
      withCredentials: true
    }).then((res) => {
      setCrates(res.data);
    })
  }, [])

  useEffect(() => {
    dispatch({ type: "auth/readCratesFromDb", payload: { crates: crates }})
  }, [crates]);
  
  useMemo(() => {
    const maximumCrateCost = () => {
      let max = 0;
      crates.forEach((crate: any) => {
        if (crate.cost > max) {
          max = crate.cost;
        }
      })
      setMaximumValue(max);
    }
    maximumCrateCost();
  }, [crates])


  return (
    <div className="container">
      <div className="containerContent">
        <InfoContainer theme={theme} crates={user.crates.length} cratesOpened={user.cratesOpened}/>
        <InputChestContainer theme={theme} maximumValue={maximumValue} userId={user._id}/>
        <ChestContainer theme={theme} crates={user.crates} />
      </div>
    </div>    
  )
}

export default Container
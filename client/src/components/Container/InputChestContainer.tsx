import { useEffect, useMemo, useState } from 'react'
import { ThemeStateType } from '../../redux/slices/themeSlice'
import { Slider } from "baseui/slider";
import { Combobox } from "baseui/combobox";
import { LightTheme, ThemeProvider, createTheme, darkThemePrimitives } from 'baseui';
import axios from 'axios';
import { Crate } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCratesQuery } from '../../redux/slices/containerSlice';

type InputChestContainerType = {
    theme: ThemeStateType,
    maximumValue: number,
    userId: string
}

const InputChestContainer = ({ theme, maximumValue, userId }: InputChestContainerType) => {    

    const [sliderValue, setSliderValue] = useState<number[]>([0, maximumValue !== 0 ? maximumValue : 100]);
    const [selectedRarity, setSelectedRarity] = useState<string>("All");
    const [cratesWithOptions, setCratesWithOptions] = useState<Crate[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setSliderValue([0, maximumValue < 100 ? 100 : maximumValue])   
    }, [maximumValue])


    useEffect(() => {

    let timeoutId: NodeJS.Timeout | null = null;
    const delay = 1000;
    
    const fetchQueryData = () => {
        if (selectedRarity !== "All") {
            axios.get(`http://localhost:3000/api/crates/${userId}/query?max=${sliderValue[1]}&min=${sliderValue[0]}&rarity=${selectedRarity}`, {withCredentials: true}).then(res => {
                setCratesWithOptions(res.data)
            })
        } 
        else {
            axios.get(`http://localhost:3000/api/crates/${userId}/query?max=${sliderValue[1]}&min=${sliderValue[0]}`, {withCredentials: true}).then(res => {
                setCratesWithOptions(res.data)
            })
            }
        }

    const handleTimeout = () => {
        timeoutId = null;
        fetchQueryData();
    }

    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(handleTimeout, delay);

    return () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    }

    }, [sliderValue, selectedRarity])


    



    useEffect(() => {
        dispatch(fetchCratesQuery(cratesWithOptions))
    }, [cratesWithOptions, dispatch])
 

  return (
    <div className="inputChestContainer" style={{
        backgroundColor: theme === "dark" ? "#474242" : "rgb(192, 254, 255)",
    }}>
        <div className="sliderContainer">
            <Slider value={sliderValue} max={maximumValue > 100 ? maximumValue : 100} min={0} step={1}
            onChange={({ value }) => setSliderValue(value)}
            overrides={{
                Tick: {
                    style: {
                        fontFamily: "DosisBold",
                        color: `${theme === "light" ? "black" : "white"}`
                    }
                },
                ThumbValue: {
                    style: {
                        fontFamily: "DosisBold",
                        color: `${theme === "light" ? "black" : "white"}`,
                        backgroundColor: `${theme === "light" ? "rgba(108, 222, 230, 0.995)" : "rgb(31, 60, 69)"}`,
                    }
                },
                Thumb: {
                    style: {
                        backgroundColor: `${theme === "light" ? "rgba(108, 222, 230, 0.995)" : "rgb(31, 60, 69)"}`,
                    }
                }

            }}
            />
        </div>
        <div className="rarityContainer">
            <p> Select rarity </p>
            <ThemeProvider 
            theme={theme === "dark" ? createTheme(darkThemePrimitives, {
                    comboboxListItemFocus: "#ff0000",
                    combolistListItemHover: "#ff0000"
            }) : LightTheme}
            > 
            <Combobox 
            value={selectedRarity}
            onChange={nextValue => setSelectedRarity(nextValue)}
            options={["All", "Common", "Uncommon", "Rare", "Epic", "Legendary"]}
            mapOptionToString={option => option}
            overrides={{
                ListItem: {
                    style: {
                      color: `${theme === "light" ? "black" : "white"}`,
                      fontFamily: "DosisBold",
                      backgroundColor: `${theme === "light" ? "rgb(192, 254, 255)" : "#474242"}`,
                    }
                  },
                  Input: {
                    props: {
                      overrides: {
                        Input: {
                          style: {
                            color: `${theme === "light" ? "black" : "white"}`,
                            fontFamily: "DosisBold",
                            backgroundColor: `${theme === "light" ? "rgb(123, 253, 255)" : "#474242"}`,
                          }
                        }
                      }
                    }
                },
                InputContainer: {
                    style: {
                        color: `${theme === "light" ? "black" : "white"}`,
                    }
                },
                Root: {
                    style: {
                        color: `${theme === "light" ? "black" : "white"}`,
                        backgroundColor: `${theme === "light" ? "rgb(123, 253, 255)" : "#474242"}`
                    }
                },
                }}
            />
            </ThemeProvider>
        </div>
    </div>
    )
}

export default InputChestContainer
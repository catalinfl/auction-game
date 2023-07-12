import React, { useState } from 'react'
import { ThemeStateType } from '../../redux/slices/themeSlice'
import { Slider } from "baseui/slider";
import { Combobox } from "baseui/combobox";
import { GiBlackBridge } from 'react-icons/gi';
import { LightTheme, ThemeProvider, createTheme, darkThemePrimitives } from 'baseui';

const ChestContainer = ({ theme }: { theme: ThemeStateType } ) => {
    
    // put max value
    const [sliderValue, setSliderValue] = useState<number[]>([0, 100]);


    const [selectedRarity, setSelectedRarity] = useState<string>("Common");


  return (
    <div className="chestContainer" style={{
        backgroundColor: theme === "dark" ? "#474242" : "rgb(192, 254, 255)",
    }}>
        <div className="sliderContainer">
            <Slider value={sliderValue} max={1000} 
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
                        border: `${theme === "light" ? "solid 1px grey" : null }`
                    }
                }

            }}
            />
        </div>
        <div className="rarityContainer">
            <p> Select rarity </p>
            <ThemeProvider 
            theme={theme === "dark" ? createTheme(darkThemePrimitives, {
                colors: {
                    comboboxListItemFocus: "#ff0000",
                    combolistListItemHover: "#ff0000"
            }}) : LightTheme}
            > 
            <Combobox 
            value={selectedRarity}
            onChange={nextValue => setSelectedRarity(nextValue)}
            options={["Common", "Uncommon", "Rare", "Epic", "Legendary"]}
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

export default ChestContainer
export type CSSContainerType = {
    [key: string]: string | number;
}



export const blockStyle = (theme: "light" | "dark"): any => {
    if (theme === "light") {
        return {
            backgroundColor: "#a7e7f2",
            boxShadow: "0px 0px 20px 0px rgba(147, 146, 146, 0.75)"
        }
    }
    else return {
        backgroundColor: "#474242",
        color: "white"
    }
  }

export default blockStyle;
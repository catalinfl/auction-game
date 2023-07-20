import { createSlice } from "@reduxjs/toolkit";

type chestState = {
    chest: string,
    onOpen: boolean,
    open: boolean,
    chestItems: string[],
}

const initialValue: chestState = {
    chest: "",
    open: false,
    chestItems: [],
    onOpen: false
}

const chestSlice = createSlice({
    name: "chest",
    initialState: initialValue,
    reducers: {
        startOpening: (state, action) => {
            state.onOpen = true;
            state.chest = action.payload.chest
        },
        stopOpening: (state) => {
            state.onOpen =false;
            state.chest = ""
        },
        getOneItem: (state, action) => {
            state.chestItems.push(action.payload.item);
        },
        finishOpening: (state) => {
            state.open = false,
            state.onOpen = false,
            state.chest = ""
        }
    }

})

export const { startOpening, stopOpening, getOneItem, finishOpening } = chestSlice.actions 

export default chestSlice.reducer;
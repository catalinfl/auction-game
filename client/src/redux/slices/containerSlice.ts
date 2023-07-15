import { createSlice } from "@reduxjs/toolkit";
import { Crate } from "./authSlice";

type ContainerType = {
    crates: Crate[]
}


const initialState: ContainerType = {
    crates: []
}

export const containerSlice = createSlice({
    name: "container",
    initialState,
    reducers: {
        fetchCrates: (state, action) => {
            state.crates = action.payload;
        },
        fetchCratesQuery: (state, action) => {
            state.crates = action.payload;
        }
    }
})

export const { fetchCrates, fetchCratesQuery } = containerSlice.actions; 

export default containerSlice.reducer;
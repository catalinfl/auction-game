import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
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
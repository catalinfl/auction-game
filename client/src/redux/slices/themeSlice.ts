import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type ThemeType<T, P> = T | P;

export type ThemeStateType = ThemeType<"light", "dark">

type initialStateType = {
    theme: ThemeStateType
}

const initialState: initialStateType = {
    theme: "light"
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<ThemeStateType>) => {
            state.theme = action.payload;
        }
    }
})

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type ThemeType<T, P> = {
    theme: T | P
}

export type ThemeStateType = ThemeType<"light", "dark">

const initialState: ThemeStateType = {
    theme: "light"
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<"light" | "dark">) => {
            state.theme = action.payload;
        }
    }
})

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
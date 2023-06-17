import { createSlice } from "@reduxjs/toolkit";

export type UserStateType = {
    connected: boolean,
    username: string,
    level: number,
    xp: number,
    money: number,
    _id: string
}

const initialState: UserStateType = {
    connected: false,
    username: "",
    level: 0,
    xp: 0, 
    money: 0,
    _id: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.connected = true;
            state.username = action.payload.username;
            state.level = action.payload.level;
            state.xp = action.payload.xp,
            state.money = action.payload.money,
            state._id = action.payload._id
        },
        changeXP: (state, action) => {
            state.xp += action.payload;
        },
        changeLevelUP: (state) => {
            state.level += 1;
            state.xp = 0;
        },
        disconnect: () => initialState
    }
});

export const { login, disconnect } = authSlice.actions

export default authSlice.reducer;


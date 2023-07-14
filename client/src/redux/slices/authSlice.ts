import { createSlice } from "@reduxjs/toolkit";

export interface Crate {
    _id: string,
    bought: Date,
    rarity: string,
    cost: number,
    type: string,
    tier: string,
    owner: string
}

export type UserStateType = {
    connected: boolean,
    username: string,
    level: number,
    xp: number,
    money: number,
    crates: Array<Crate>,
    cratesOpened: number,
    premium: string,
    admin: boolean,
    _id: string,
    lastTimeConnected: Date,
    lastChestReceived: Date
}

const initialState: UserStateType = {
    connected: false,
    username: "",
    level: -1,
    xp: -1,   
    crates: [],
    cratesOpened: -1,
    premium: "",
    admin: false,
    money: -1,
    _id: "",
    lastTimeConnected: new Date(),
    lastChestReceived: new Date()
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
            state.crates = action.payload.crates; 
            state.cratesOpened = action.payload.cratesOpened;
            state.premium = action.payload.premium;
            state.admin = action.payload.admin;
            state.lastChestReceived = action.payload.lastChestReceived;
            state.lastTimeConnected = action.payload.lastTimeConnected;
        },
        changeXP: (state, action) => {
            state.xp += action.payload;
        },
        changeLevelUP: (state) => {
            state.level += 1;
            state.xp = 0;
        },
        buyChestFromAuction: (state, action) => {
            state.money -= action.payload.cost;
            state.crates.push(action.payload.crates);
        },
        readCratesFromDb: (state, action) => {
            state.crates = action.payload.crates;
        },
        receiveChest: (state, action) => {
            state.crates.push(action.payload);
            state.lastChestReceived = new Date(Date.now());
        },
        disconnect: () => initialState
    }
});

export const { login, disconnect, receiveChest, readCratesFromDb, buyChestFromAuction, changeLevelUP, changeXP } = authSlice.actions

export default authSlice.reducer;


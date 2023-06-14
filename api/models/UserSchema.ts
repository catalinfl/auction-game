import mongoose from "mongoose";

export interface UserInterface {
    _id?: string,
    username: string,
    password: string,
    email: string,
    level?: number,
    money?: number,
    xp?: number,
    crates?: number,
    cratesOpened?: number,
    premium?: string,
    admin?: boolean
}

const userSchema = new mongoose.Schema<UserInterface>({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 50
    },
    level: {
        type: Number,
        required: false,
        default: 1
    },
    money: {
        type: Number,
        default: 500,
        required: false,
    },
    xp: {
        type: Number,
        default: 0,
        required: false,
    },
    crates: {
        type: Number,
        default: 0,
        required: false,
    },
    cratesOpened: {
        type: Number,
        default: 0,
        required: false
    },
    premium: {
        type: String,
        default: "false",
        required: false
    },
    admin: {
        type: Boolean,
        default: false,
        required: false
    }
})

const User = mongoose.model("User", userSchema);

export default User;

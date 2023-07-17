import mongoose from "mongoose";
import { UserInterface } from "./UserSchema";

export interface CrateInterface extends mongoose.Document {
    bought: Date,
    rarity: string,
    cost: number,
    tier: string,
    type: string,
    owner: mongoose.Types.ObjectId | UserInterface["_id"],
    objects: number
}

const crateSchema = new mongoose.Schema<CrateInterface>({
    bought: {
        type: Date,
        required: true,
        default: Date.now()
    },
    rarity: {
        type: String,
        required: true,
        default: "common"
    },
    cost: {
        type: Number,
        default: 100
    },
    tier: {
        type: String,
        required: true,
        default: "1"
    },
    type: {
        type: String,
        required: true,
        default: "Crate"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    objects: {
        type: Number,
        required: true,
        default: 5
    }
});

export default mongoose.model<CrateInterface>("Crate", crateSchema);

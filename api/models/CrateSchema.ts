import mongoose from "mongoose";
import { UserInterface } from "./UserSchema";

export interface CrateInterface extends mongoose.Document {
    bought: Date,
    rarity: string,
    cost: number,
    tier: string,
    owner: mongoose.Types.ObjectId | UserInterface["_id"]
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
        required: true,
        default: 100
    },
    tier: {
        type: String,
        required: true,
        default: "tier1"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export default mongoose.model<CrateInterface>("Crate", crateSchema);

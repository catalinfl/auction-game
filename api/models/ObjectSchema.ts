import mongoose from "mongoose";
import { UserInterface } from "./UserSchema";

// not used anymore

export interface ObjectInterface extends mongoose.Document {
    name: string,
    description: string,
    rarity: string,
    cost: number,
    owner: mongoose.Schema.Types.ObjectId | UserInterface["_id"],
}

const objectSchema = new mongoose.Schema<ObjectInterface>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    rarity: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    }
})

const ChestObject = mongoose.model<ObjectInterface>("Object", objectSchema);

export default ChestObject;
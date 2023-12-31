import express, { Router } from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import registerRoute from "./routes/registerRoute"
import loginRoute from "./routes/loginRoute"
import cookieParser from "cookie-parser"
import crateRoute from "./routes/crateRoute"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser())

// Register Route 
app.use('/api/register', registerRoute);

// Login Route
app.use('/api/login', loginRoute);

// Crate Route
app.use('/api/crates', crateRoute);


const URL = process.env.MONGO_URL as string;

mongoose.connect(URL).then(() => {
    console.log("Database connected");
}).catch((error) => {
    console.log(error);
})

app.listen(3000, () => {
    console.log("Server is working on port 3000");
})

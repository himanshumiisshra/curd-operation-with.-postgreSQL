import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/dbConnect.js";
import studentRoute from "./routes/studentRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import {initializeDatabase} from "./data/createStudentTable.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", studentRoute)

// Error handling middlewares
app.use(errorHandler)


// create table before starting server
const initializeTables = async () => {
    await initializeDatabase(); 
};

initializeTables();

// testing POSTGRES Connection
app.get("/", async (req,res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`)
})


// Server running

app.listen(port, () => {
    console.log(`Server is runing on ${port}`)
})

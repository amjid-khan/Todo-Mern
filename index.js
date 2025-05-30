import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const app = express()

app.use(express.json());






// connect mongoDB and start server
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log(`MongoDB connected successfully: ${process.env.DB_URL}`);

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

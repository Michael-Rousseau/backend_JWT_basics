import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "express-async-errors";
const app = express();
import {notFoundMiddleware} from "./middleware/not-found";
import {errorHandlerMiddleware} from "./middleware/error-handler";
import authRouter from "./routes/auth";
import jobRouter from "./routes/jobs";
import {connectDB} from "./db/connect";

import {authentificatedUser} from "./middleware/authentification";


app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs',authentificatedUser, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const URL = process.env.MONGO_URL || ''
const start = async () =>{
    try {
        await connectDB(URL);
        app.listen(port, () => console.log(`server is running on port ${port}...`));
    }catch (err)
    {
        console.error(err);
    }
}
start();
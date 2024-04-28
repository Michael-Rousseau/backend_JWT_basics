import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { notFoundMiddleware } from "./middleware/not-found";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import authRouter from "./routes/auth";
import jobRouter from "./routes/jobs";
import { connectDB } from "./db/connect";
import {authentificatedUser} from "./middleware/authentification";

const app = express();

app.use(helmet());

app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authentificatedUser, jobRouter);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL || "";

const start = async () => {
    try {
        await connectDB(mongoURL);
        app.listen(port, () => console.log(`Server is running on port ${port}...`));
    } catch (err) {
        console.error(err);
    }
};

start();

import express, {Application, NextFunction, Request, Response} from "express"
import dotenv from "dotenv";
import router from "./route/api"
import rateLimit, {RateLimitRequestHandler} from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors"
import cookieParser from "cookie-parser";
import {connectDB} from "./db";
import {sanitizeMiddleware} from "./middleware/sanitize";

dotenv.config();
const app: Application = express();

//middleware
app.use(cookieParser());

const origins: string[] = process.env.ORIGINS?.split(",") ?? [];
const corsOptions = {
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false
}
app.use(cors(corsOptions));

app.use(express.json());

app.use(helmet({
    contentSecurityPolicy: false,
}));

app.use(hpp());

app.use(sanitizeMiddleware);


app.use(express.urlencoded({limit: '1mb', extended: true}));

const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests. Try again later"
});
app.use(limiter);



app.use("/api", router);
app.use((_req: Request, res: Response): void => {
    res.status(404).send("Not Found");
})

export default app;
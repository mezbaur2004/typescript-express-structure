import express, {Application, NextFunction, Request, Response} from "express"
import dotenv from "dotenv";
import router from "./route/api"
import rateLimit, {RateLimitRequestHandler} from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors"
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import cookieParser from "cookie-parser";
import * as mongoose from "mongoose";

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

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

app.use((req: Request, _res: Response, next: NextFunction) => {
    const sanitize = (obj: any) => {
        if (!obj || typeof obj !== "object") return;
        for (const key in obj) {
            if (typeof obj[key] === "string") obj[key] = DOMPurify.sanitize(obj[key]);
            else if (typeof obj[key] === "object") sanitize(obj[key]);
        }
    };
    sanitize(req.body);
    next();
});

//app.use(mongoSanitize());

app.use(express.urlencoded({limit: '1mb', extended: true}));

const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests. Try again later"
});
app.use(limiter);
let URL: string | undefined = process.env.DB;
let option: { user: string, pass: string, autoIndex: boolean } = {user: '', pass: '', autoIndex: true}
if (!URL) {
    console.log("URL doesn't exist");
} else {
    mongoose.connect(URL, option).then((): void => {
        console.log("MongoDB Connected");
    }).catch((err): void => {
        console.log("DB connection error:" + err);
    });

}


app.use("/api", router);
app.use((_req: Request, res: Response): void => {
    res.status(404).send("Not Found");
})

export default app;
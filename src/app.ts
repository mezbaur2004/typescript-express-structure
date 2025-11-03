import express, {Application,Request,Response} from "express"
import dotenv from "dotenv";
import router from "./route/api"



dotenv.config();
const app:Application=express();


//middleware
app.use(express.json());


app.use("/api",router);
app.use((_req:Request,res:Response):void=>{
    res.status(404).send("Not Found");
})

export default app;
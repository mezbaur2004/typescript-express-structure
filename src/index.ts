import app from "./app";
import dotenv from "dotenv";
dotenv.config();
const PORT:Number=Number(process.env.PORT);
app.listen(PORT,():void=>{
    console.log(`Server running on http://localhost:${PORT}`)
});
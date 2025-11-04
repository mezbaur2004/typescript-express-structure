import app from "./app";
import dotenv from "dotenv";
import {connectDB} from "./db";
dotenv.config();
const PORT:Number=Number(process.env.PORT);
(async () => {
    await connectDB();
    app.listen(PORT, ():void =>
        console.log(`Server running on http://localhost:${PORT}`)
    );
})();
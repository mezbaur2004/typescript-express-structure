import * as mongoose from "mongoose";

const URL: string | undefined = process.env.DB;
const option: { user: string, pass: string, autoIndex: boolean } = {user: '', pass: '', autoIndex: true}
export const connectDB=async()=>{
    if (!URL) {
        console.log("URL doesn't exist");
    } else {
        mongoose.connect(URL, option).then((): void => {
            console.log("MongoDB Connected");
        }).catch((err): void => {
            console.log("DB connection error:" + err);
            process.exit(1);
        });
    }
}
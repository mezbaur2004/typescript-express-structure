import express, {Router,Request,Response} from "express";

const router:Router=express.Router();

router.get("/",(_req:Request,res:Response)=>{
    res.json("API is working!")
})

router.post("/test-sanitize",(req:Request,res:Response)=>{
    res.json(req.body);
})

export default router;
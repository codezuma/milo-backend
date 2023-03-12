import express, { Request, Response } from "express";
import  {z} from 'zod';
import validate from "../../validator";
const router = express.Router();



router.get('/',(req:Request,res:Response)=>{
    res.json({message:"working"});
})

module.exports = router
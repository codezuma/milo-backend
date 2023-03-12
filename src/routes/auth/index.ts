import express, { Request, Response } from "express";
import { z } from "zod";
import validate from "../../validator";
const router = express.Router();

const emailValidateSchema = z.object({
    email:z.string().email("email not valid")
})
router.post('/login/email-validate/', validate(emailValidateSchema),(req:Request,res:Response)=>{
    res.json({message:"working"});
})


module.exports = router
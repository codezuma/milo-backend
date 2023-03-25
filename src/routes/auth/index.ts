import express, { Request, Response } from "express";
import { CommandStartedEvent } from "mongodb";
import { z } from "zod";
import { user } from "../../db";
import validate from "../../validator";
const router = express.Router();

const emailValidateSchema = z.object({
    email:z.string().email("email not valid")
})
type EmailValidateType = z.infer<typeof emailValidateSchema>;

router.get('/login/email-validate/',async (req:Request<EmailValidateType >,res:Response)=>{
   try{
    if(!req.query.email)
    res.status(400).json(({message:'Email is empty'}));

    const filter:{email:string} = {email:String(req.query.email)};
    const users = await user.findUser(filter);
    if(!(users===0)){
        console.log('users',users)
        res.status(422);
        res.json({message:'Email already exists',
        email:req.body.email});
    }
    else{
        res.status(200);
        res.json(
            {message:'Email Does not exist',
            email:req.body.email});
    }
   } 
   catch(err:any){
    console.error(err);
    res.status(500);
    res.json(
        {message:'Server Error',
         error:err,
        email:req.body.email});
   }
})


module.exports = router
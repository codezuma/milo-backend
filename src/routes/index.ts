import express from "express";
import  { Errback, Express, NextFunction, Request, Response } from 'express';

const router = express.Router();


router.get('/',(req: Request, res: Response)=>{
    res.send('api working 🚀');
})

//setting all routes for app

router.use('/users/',require("./users/"));
router.use('/auth/',require("./auth/"));  

module.exports = router;
  
import { OAuth2Client } from "google-auth-library";
import express, { Request, Response } from "express";
import { z } from "zod";
import user from "@models/user";
const router = express.Router();

router.get("/",(req,res)=>{
  res.send('me').end();
})

export default router;
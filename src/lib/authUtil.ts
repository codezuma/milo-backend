import crypto from "crypto";
import passport from "passport";
import { NextFunction, Request,Response } from "express";

export const genPassword = (password: string) => {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
};

export const validPassword = (password: string, hash: string, salt: string) => {
  var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash === hashVerify;
};

export const isUserAuthenticated = (req:Request,res:Response,next:NextFunction)=>{
  if(req.isAuthenticated())
  next();
  else{
    res.status(401).end();
  }

}  

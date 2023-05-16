import express from "express";
import config from "@config/index";
import expressLoader from "./express";
import mongooseLoader from './mongoose';
import session from "./session";
import passportLoader from "./passport";

export default async  ({ expressApp }: { expressApp: express.Application }) => {
    const mongoConnection = await mongooseLoader();
    console.log('✌️ DB loaded and connected!');
    
    session(expressApp,mongoConnection);
    console.log('✌️ Session Storage is up');
    
    passportLoader({ app: expressApp });
    console.log('✌️ passport loaded');
 
    expressLoader({ app: expressApp });
    console.log('✌️ Express loaded');
  };
  
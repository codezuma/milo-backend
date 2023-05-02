import express from "express";
import config from "@config/index";
import expressLoader from "./express";
import mongooseLoader from './mongoose';

export default async  ({ expressApp }: { expressApp: express.Application }) => {
    await mongooseLoader();
    console.log('✌️ DB loaded and connected!');
  
 
  
/*     const userModel = {
      name: 'userModel',
      // Notice the require syntax and the '.default'
      model: require('../models/user').default,
    };
   */
 
    expressLoader({ app: expressApp });
    console.log('✌️ Express loaded');
  };
  
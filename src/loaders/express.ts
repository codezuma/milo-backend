import express, { Errback, Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import config from "@config/index";
import router from "@routes/index";

export default ({ app }: { app: express.Application }) => {
  //Check status of the app
  app.get("/status", (req, res) => {
    res.status(200).end();
  });


  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json({ type: "*/*" }));


  //setting routes
  app.use(config.api.prefix,router);

  //wrong routes
  app.all("/",(req,res)=>{res.status(400).end();})
};


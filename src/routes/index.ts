import user from "@models/user";
import express from "express";
import { Errback, Express, NextFunction, Request, Response } from "express";

import authRouter from "./auth";
import usersRouter from "./user";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("api working 🚀");
});

//setting all routes for app

router.use("/users", usersRouter);

router.use("/auth", authRouter);

export default router;
import user from "@models/user";
import { createUserType } from "@routes/user";
import { create } from "domain";
import { Request,Response } from "express";
import { z } from "zod";
import validate from "../validator";

const userExists = async (req: Request, res: Response) => {
    const email = String(req.params.id);

    try {
      if (!email) res.status(400).json({ message: "Email is empty" });
      const users = await user.exists({email:email});
  
      if (!(users === null)) {  
        console.log("users", users);
        res.status(422);
        res.json({ message: "Email already exists", email: req.body.email });
      } else {
        res.status(200);
        res.json({ message: "Email Does not exist", email: req.body.email });
      }
    } catch (err: any) {
      console.error(err);
      res.status(500);
      res.json({ message: "Server Error", error: err, email: req.body.email });
    }
};

const createUser =  async (req: Request<createUserType>, res: Response) => {
  try {
    const users = await user.create(req.params);
    if (!users.acknowledged) {
      console.log("users", users);
      res.status(422);
      res.json({ message: "Email already ", email: req.body.email });
    } else {
      res.status(200);
      res.json({ message: "Email Does not exist", email: req.body.email });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500);
    res.json({ message: "Server Error", error: err, email: req.body.email });
  }
};
const userController = {
  "userExists": userExists,
  "createUser":createUser
};
export default userController;
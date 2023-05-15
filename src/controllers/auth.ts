import { genPassword } from "@lib/authUtil";
import User from "@models/user";
import { NextFunction, Request, Response } from "express";
import z from "zod";

export const registerUserSchema = z.object({
  email: z.string().email("email not valid"),
  password: z.string().min(8, { message: "Minimum length is 8" }),
});

export type registerUserType = z.infer<typeof registerUserSchema>;

export const registerController = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const { salt, hash } = genPassword(password);

    const newUser = new User({
      email: req.body.email,
      salt: salt,
      password: hash,
      admin: true,
    });
    await newUser.save();

    res.status(201).json({ message: "user created " }).end();
  } catch (err) {
    res.status(500).json({ message: "error accured", err: err });
  }
};

export const checkUser = async (req: Request<registerUserType>, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
      console.log("user", user);
      next();
    } else {
      res.status(401).json({ message: "user already exists" }).end();
    }
  } catch {
    res.status(501).json({ message: "error accured on server" }).end();
  }
};

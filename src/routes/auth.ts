import express from "express";
import passport from "passport";
import { checkUser, registerController, registerUserSchema } from "../controllers/auth";
import validate from "../validator";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(req.session).end();
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(201).end();
});

router.post("/register", validate(registerUserSchema), checkUser, registerController);

router.delete("/logout",(req, res) => {
  console.log('logout called');
  req.logout(err => {
    res.send(500).json({ message: "error acurred not logedout" }).end();
  });
});

export default router;

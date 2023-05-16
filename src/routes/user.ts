import express from "express";
import userController from "../controllers/user";
import { isUserAuthenticated } from "@lib/authUtil";


const router = express.Router();

//checking if user exist or not

router.get("/me",isUserAuthenticated,(req, res) => {
  res.json(req.user).end();
});

router.get("/:email", userController.userExists);

export default router;
isUserAuthenticated
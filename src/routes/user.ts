import express from "express";
import userController from "../controllers/user";


const router = express.Router();

//checking if user exist or not

router.get("/me",(req, res) => {
  console.log({ user: req.user, session: req.user });
  console.log(req.session);
  res.send().end();
});

router.get("/:email", userController.userExists);

export default router;

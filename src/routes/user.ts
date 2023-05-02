import user from "@models/user";
import express, { Request, Response } from "express";
import { z } from "zod";
import userController from "../controllers/user";
import validate from "../validator";
const router = express.Router();

//checking if user exist or not
router.get("/:email", userController.userExists);

//create a user

const createUserSchema = z.object({
  email: z.string().email("email not valid"),
  password: z.string().min(8, { message: "Minimum length is 8" }),
});
export type createUserType = z.infer<typeof createUserSchema>;

router.post("/",validate(createUserSchema),);
export default router;

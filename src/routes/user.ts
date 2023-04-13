import user from "@models/user";
import express, { Request, Response } from "express";
import { z } from "zod";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "working" });
});

const createUserSchema = z.object({
  email: z.string().email("email not valid"),
  password: z.string().min(8, { message: "Minimum length is 8" }),
});
type createUserType = z.infer<typeof createUserSchema>;
/* 
router.post("/", validate(createUserSchema), async (req: Request<createUserType>, res: Response) => {
  try {
    const users = await user.addUser(req.params);
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
});
 */
  router.get("/e",(req,res)=>{
    res.json({status:"working"}).end();
  })

  router.get("/:email", async (req: Request, res: Response) => {
    
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
  });
  
export default router;

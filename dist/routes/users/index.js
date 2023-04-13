"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({ message: "working" });
});
const createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email("email not valid"),
    password: zod_1.z.string().min(8, { message: "Minimum length is 8" }),
});
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
module.exports = router;

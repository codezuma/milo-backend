import moongoseDB from "@loaders/mongoose";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      default:'user',
      index: true,
    },

    email: {
      type: String,
      required: [true, "Please enter a Email"],
      lowercase: true,
      unique: true,
      index: true,
    },

    password: String,
    salt: String,
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true },
);


const User = mongoose.model<mongoose.Document&User>("User", userSchema);


export default User;


type User = {
  name:string,
  password:string,
  salt:string,
  email:string,
  role:'user',
}
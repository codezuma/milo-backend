import { InsertOneResult } from "mongodb";
import { UserDto } from "./model/UserDto";

 
export interface UserDb {
  // external interface
  findUser({email}:{email:string}): Promise<number>;
  addUser({email,password}:{email:string,password:string}):Promise<InsertOneResult>;
 
}
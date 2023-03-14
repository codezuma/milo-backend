import { UserDto } from "./model/UserDto";

 
export interface UserDb {
  // external interface
  findByEmail({email}:{email:string}): Promise<UserDto[]>;
 
}
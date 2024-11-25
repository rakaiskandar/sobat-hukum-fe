import { Role } from "@/constant/role";
import { DefaultUser } from "next-auth";
import { DefaultSession } from "next-auth";

// Define the structure of your user and session
interface IUser extends DefaultUser {
  id: string;
  username: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
}

declare module "next-auth" {
  interface User extends IUser {}

  interface Session extends DefaultSession {
    user: IUser; // Ensure the user object contains the correct fields
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {} // Ensure JWT contains user info
}

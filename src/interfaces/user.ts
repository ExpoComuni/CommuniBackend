import { Role } from "@/enum/role"

export interface UserInput {
    cedula: string;
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
    password: string;
  }
  
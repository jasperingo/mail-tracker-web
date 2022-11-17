import { type Letter } from "~/models/letter.model";
import { type Role } from "~/models/role.model";

export class User {
  id!: number;

  title!: string | null;

  firstName!: string;

  lastName!: string;

  email!: string;

  password!: string;

  matriculationNumber!: string | null;

  isAdmin!: boolean;

  createdAt!: string;

  roles!: Role[];

  letters!: Letter[];
}

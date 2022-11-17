import { type Letter } from "~/models/letter.model";
import { type Role } from "~/models/role.model";

export class Recipient {
  id!: number;

  level!: number;

  signedAt!: string | null;

  letter!: Letter;

  role!: Role;
}

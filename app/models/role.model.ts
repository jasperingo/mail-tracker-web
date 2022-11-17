import { type Recipient } from "~/models/recipient.model";
import { type User } from "~/models/user.model";

export class Role {
  id!: number;

  title!: string;

  endedAt!: string | null;

  createdAt!: string;

  user!: User;
  
  recipients!: Recipient[];
}

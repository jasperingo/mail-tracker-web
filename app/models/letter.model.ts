import { type LetterValue } from "~/models/letter-value.model";
import { type Recipient } from "~/models/recipient.model";
import { type Template } from "~/models/template.model";
import { type User } from "~/models/user.model";

export class Letter {
  id!: number;

  title!: string;

  createdAt!: string;

  user!: User;

  template!: Template;

  letterValues!: LetterValue[];

  recipients!: Recipient[];
}

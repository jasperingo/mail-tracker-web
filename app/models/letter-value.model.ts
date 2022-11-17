import { type Letter } from "~/models/letter.model";
import { type TemplateVariable } from "~/models/template-variable.model";

export class LetterValue {
  id!: number;

  value!: string;

  letter!: Letter;

  templateVariable!: TemplateVariable;
}

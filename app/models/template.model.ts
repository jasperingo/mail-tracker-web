import { type Letter } from "~/models/letter.model";
import { type TemplateVariable } from "~/models/template-variable.model";

export class Template {
  id!: number;

  title!: string;

  content!: string;

  createdAt!: string;

  templateVariables!: TemplateVariable[];

  letters!: Letter[];
}

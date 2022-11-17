import { type LetterValue } from "~/models/letter-value.model";
import { type Template } from "~/models/template.model";

export enum TemplateVariableSource {
  INPUT = 'input',
  DATABASE = 'database',
}

export class TemplateVariable {
  id!: number;

  name!: string;

  source!: TemplateVariableSource;

  databaseField!: string;

  template!: Template;

  letterValues!: LetterValue[];
}

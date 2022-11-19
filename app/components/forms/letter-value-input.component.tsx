import { InputComponent } from "~/components/forms/input.component";
import { TemplateVariableSource, type TemplateVariable } from "~/models/template-variable.model";
import { type User } from "~/models/user.model";

export const LetterValueInputComponent = ({ templateVariable, user }: { user: User; templateVariable: TemplateVariable; }) => {
  const isFromDb = templateVariable.source === TemplateVariableSource.DATABASE;
  return (
    <div className="border rounded-lg p-4 mb-4">
      <input type="hidden" value={templateVariable.id} name={isFromDb ? 'templateVarFromDbId' : 'letterValues[templateVariableId][]'} />
      <InputComponent 
        id="letter-value-input" 
        label={templateVariable.name} 
        name={isFromDb ? 'templateVarFromDb' : 'letterValues[value][]'} 
        value={isFromDb ? (user as any)[templateVariable.databaseField]: ''}
        disabled={isFromDb} 
      />
    </div>
  );
}

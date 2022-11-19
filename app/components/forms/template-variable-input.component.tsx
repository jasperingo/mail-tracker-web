import { useState } from "react"
import { InputComponent } from "~/components/forms/input.component";
import { SelectComponent } from "~/components/forms/select.component";
import { TemplateVariableSource } from "~/models/template-variable.model";

export const TemplateVariableInputComponent = () => {
  const [enable, setEnable] = useState(false);

  return (
    <div className="border rounded-lg p-4 mb-4">
      <InputComponent id="variable-name-input" label="Name" name="templateVariables[name][]" />
      <SelectComponent 
        id="variable-source-input"
        label="Source" 
        name="templateVariables[source][]" 
        onChange={(e) => setEnable(e.target.value !== 'database')}
        options={Object.values(TemplateVariableSource).map((i) => ({ text: i, value: i }))} 
      />
      <InputComponent id="variable-db-field-input" label="Database field" name="templateVariables[databaseField][]" disabled={enable} />
    </div>
  );
}

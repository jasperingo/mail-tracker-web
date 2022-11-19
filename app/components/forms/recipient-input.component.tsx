import { SelectComponent } from "~/components/forms/select.component";
import { type Role } from "~/models/role.model";

export const RecipientInputComponent = ({ roles, index }: { index: number; roles: Role[]; }) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <input type="hidden" value={index} name="recipients[level][]" />
      <SelectComponent 
        id="recipient-roleId-input" 
        label={`Role (${index + 1})`}
        name="recipients[roleId][]" 
        options={roles.map((role) => ({ text: role.title, value: role.id }))} 
      />
    </div>
  );
}

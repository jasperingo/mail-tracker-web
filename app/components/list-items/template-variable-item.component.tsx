import { type TemplateVariable } from "~/models/template-variable.model";

export const TemplateVariableItemComponent = ({ templateVariable }: { templateVariable: TemplateVariable; }) => {
  return (
    <li className="lg:w-[45%] mb-4">
      <div className="border p-4 rounded-lg">
        <div className="font-bold">{ templateVariable.name }</div>
        <div>Source: { templateVariable.source }</div>
        {
          templateVariable.databaseField && (
            <div>Database field: { templateVariable.databaseField }</div>
          )
        }
      </div>
    </li>
  );
}

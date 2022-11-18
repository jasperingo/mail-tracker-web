import { type Role } from "~/models/role.model";

export const RoleTableRowComponent = ({ role }: { role: Role; }) => {
  return (
    <tr className="border">
      <td className="p-4">{ role.id }</td>
      <td className="p-4">{ role.title }</td>
      <td className="p-4">{ new Date(role.createdAt).toUTCString() }</td>
      <td className="p-4">{ role.endedAt ? new Date(role.endedAt).toUTCString(): '(Not ended)' }</td>
      <td className="p-4">{ `${role.user.title ?? ''} ${role.user.firstName} ${role.user.lastName}` }</td>
      <td className="p-4">{ role.user.email }</td>
    </tr>
  );
}

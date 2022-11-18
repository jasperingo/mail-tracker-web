import { type User } from "~/models/user.model";

export const UserTableRowComponent = ({ user }: { user: User }) => {
  return (
    <tr className="border">
      <td className="p-4">{ user.id }</td>
      <td className="p-4">{ user.title ?? '(No title)' }</td>
      <td className="p-4">{ user.firstName }</td>
      <td className="p-4">{ user.lastName }</td>
      <td className="p-4">{ user.email }</td>
      <td className="p-4">{ user.matriculationNumber ?? '(No matriculation number)' }</td>
      <td className="p-4">{ new Date(user.createdAt).toUTCString() }</td>
    </tr>
  );
}

import { Link } from "@remix-run/react";

export const TableLinkCellComponent = ({ text, to }: { text: string; to: string; }) => {
  return (
    <td className="p-4">
      <Link 
        to={to} 
        className="block w-fit text-white py-2 px-4 font-bold rounded-lg bg-orange-600 hover:bg-orange-400"
      >
        { text }
      </Link>
    </td>
  );
}

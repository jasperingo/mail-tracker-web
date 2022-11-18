import { Link } from "@remix-run/react";
import { IoNewspaper } from "react-icons/io5";
import { type Template } from "~/models/template.model";

export const TemplateItemComponent = ({ template, to = `${template.id}` }: { template: Template; to?: string; }) => {
  return (
    <li className="lg:w-[45%] mb-8">
      <Link to={to} className="flex items-start gap-x-2 p-4 rounded-lg shadow shadow-orange-300">
        <IoNewspaper className="text-orange-600 text-4xl" />
        <div>
          <div className="font-bold text-lg">{ template.title }</div>
          <div className="text-gray-600">{ new Date(template.createdAt).toUTCString() }</div>
        </div>
      </Link>
    </li>
  );
}

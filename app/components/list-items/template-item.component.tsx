import { IoNewspaper } from "react-icons/io5";

export const TemplateItemComponent = ({ text }: { text: string; }) => {
  return (
    <li className="w-[45%] mb-8">
      <div className="flex items-start gap-x-2 p-4 rounded-lg shadow shadow-orange-300">
        <IoNewspaper className="text-orange-600 text-4xl" />
        <div className="font-bold">{ text }</div>
      </div>
    </li>
  );
}

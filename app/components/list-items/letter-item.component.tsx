import { Link } from "@remix-run/react";
import { IoMailOpen } from "react-icons/io5";
import { type Letter } from "~/models/letter.model";

export const LetterItemComponent = ({ letter }: { letter: Letter; }) => {
  return (
    <li className="lg:w-[45%] mb-8">
      <Link to={`/account/letters/${letter.id}`} className="flex items-start gap-x-2 p-4 rounded-lg shadow shadow-orange-300">
        <IoMailOpen className="text-orange-600 text-4xl" />
        <div>
          <div className="font-bold text-lg">{ letter.title }</div>
          <div className="text-gray-600">{ new Date(letter.createdAt).toUTCString() }</div>
        </div>
      </Link>
    </li>
  );
}

import { NavLink } from "@remix-run/react";
import type { IconType } from "react-icons";

export const AccountNavItemComponent = ({ text, to, Icon }: { text: string; to: string; Icon: IconType; }) => {
  return (
    <li className="mb-4">
      <NavLink 
        to={to} 
        className="flex gap-x-2 items-center py-2 px-4 font-bold rounded-lg hover:bg-orange-200 active:bg-orange-400"
      >
        <Icon />
        <span>{ text }</span>
      </NavLink>
    </li>
  );
}

import { NavLink } from "@remix-run/react"

export const HomeNavItemComponent = ({ text, to }: { text: string; to: string; }) => {

  return (
    <li>
      <NavLink 
        to={to} 
        className="block py-2 px-4 font-bold rounded-lg hover:bg-orange-200 active:bg-orange-400"
      >
        { text }
      </NavLink>
    </li>
  );
}

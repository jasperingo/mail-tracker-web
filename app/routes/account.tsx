import { Outlet } from "@remix-run/react";
import { useState } from "react";
import { IoMailUnread, IoNewspaper, IoPerson, IoPersonAdd, IoBagCheck, IoMenu, IoClose } from "react-icons/io5";
import { AccountNavItemComponent } from "~/components/list-items/account-nav-item.component";
import { CenterBlurLoaderComponent } from "~/components/loaders/center-blur-loader.component";

export default function Account() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="lg:flex">
      <CenterBlurLoaderComponent />

      <header className="p-4 lg:w-1/4 lg:h-screen lg:p-8 border">
        <div className="container">
          <div className="flex gap-x-2">
            <button onClick={() => setShowNav(!showNav)} className="rounded-lg hover:bg-orange-200 lg:hidden">
              {
                showNav ? (
                  <IoClose className="text-4xl text-orange-600" />
                ) : (
                  <IoMenu className="text-4xl text-orange-600" />
                )
              }
              <span className="sr-only">Menu</span>
            </button>
            <IoMailUnread className="text-3xl text-orange-600 lg:text-4xl" />
            <h1 className="font-bold text-orange-600 text-xl lg:text-2xl">Mail tracker</h1>
          </div>

          <nav className={`fixed z-20 overflow-y-auto w-64 left-0 bg-white lg:static lg:w-52 ${showNav ? 'left-0' : '-left-full'}`}>
            <ul className="px-4 py-8 lg:px-0">
              <AccountNavItemComponent Icon={IoNewspaper} text="Templates" to="" />
              <AccountNavItemComponent Icon={IoPerson} text="Users" to="users" />
              <AccountNavItemComponent Icon={IoPersonAdd} text="Create user" to="users/create" />
              <AccountNavItemComponent Icon={IoBagCheck} text="Roles" to="" />
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow h-screen">
        <Outlet />
      </main>

      </div>
  );
}

import { type LoaderFunction, redirect } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { useState } from "react";
import { IoMailUnread, IoNewspaper, IoAdd, IoPerson, IoPersonAdd, IoBagCheck, IoBagAdd, IoMenu, IoClose } from "react-icons/io5";
import { AccountNavItemComponent } from "~/components/list-items/account-nav-item.component";
import { CenterBlurLoaderComponent } from "~/components/loaders/center-blur-loader.component";
import { serverSession } from "~/server/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await serverSession.getSession(request);

  if (!session.has('accessToken')) {
    return redirect('/');
  }

  return null;
}

export default function Account() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="lg:flex">
      <CenterBlurLoaderComponent />

      <header className="p-4 lg:w-1/4 lg:h-screen lg:p-8 border">
        <div className="container">
          <div className="flex gap-x-2">
            <button 
              onClick={() => setShowNav(!showNav)} 
              className="text-4xl text-orange-600 rounded-lg hover:bg-orange-200 lg:hidden"
            >
              {
                showNav ? (<IoClose /> ) : (<IoMenu />)
              }
              <span className="sr-only">Menu</span>
            </button>

            <IoMailUnread className="text-3xl text-orange-600 lg:text-4xl" />

            <h1 className="font-bold text-orange-600 text-xl lg:text-2xl">
              <Link to="/">Mail tracker</Link>
            </h1>

            <div className="flex-grow text-right">
              <Link to="profile" className="inline-block text-xl border border-orange-600 rounded-full p-1 text-orange-600 hover:bg-orange-200">
                <IoPerson />
                <span className="sr-only">Profile</span>
              </Link>
            </div>
          </div>

          <nav className={`fixed z-20 overflow-y-auto w-64 left-0 bg-white lg:static lg:w-52 ${showNav ? 'left-0' : '-left-full'}`}>
            <ul className="px-4 py-8 lg:px-0">
              <AccountNavItemComponent Icon={IoNewspaper} text="Templates" to="templates" />
              <AccountNavItemComponent Icon={IoAdd} text="Create template" to="templates/create" />
              <AccountNavItemComponent Icon={IoPerson} text="Users" to="users" />
              <AccountNavItemComponent Icon={IoPersonAdd} text="Create user" to="users/create" />
              <AccountNavItemComponent Icon={IoBagCheck} text="Roles" to="roles" />
              <AccountNavItemComponent Icon={IoBagAdd} text="Create role" to="roles/create" />
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

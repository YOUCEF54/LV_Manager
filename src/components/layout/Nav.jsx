import { Outlet, Link } from 'react-router-dom';

export default function Nav() {
  const menu = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/Dashboard" },
    { name: "About", url: "/About" },
  ];

  return (
    <>
      <header>
        {/* Lower z-index to ensure scrollbar is above */}
        <nav className="fixed top-0 left-0 w-full z-40 flex items-center px-8 bg-neutral-100 h-14 shadow-md">
          <div className="flex w-full justify-between">
            <div className="text-lg font-semibold">LVM</div>
            <ul className="flex gap-4 mr-24">
              {menu.map((e, i) => (
                <li key={i}>
                  <Link to={e.url} className="hover:text-blue-600">
                    {e.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Push content down below navbar */}
      <main className="mt-14">
        <Outlet />
      </main>
    </>
  );
}

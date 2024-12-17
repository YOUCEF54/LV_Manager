import { Outlet, Link } from 'react-router-dom';

export default function Nav() {
    const menu = [
        {name:"Home",url:"/"},
        {name:"Dashboard",url:"/Dashboard"},
        {name:"About",url:"/About"},
      ]
  return (
    <>
    <header>
        <nav className="navbar flex items-center px-8 bg-neutral-100 h-14 navbar-expand-lg navbar-light bg-light">
          <div className='flex  w-full justify-between'>
            <div className='text-lg font-semibold'>LVM</div>
            <ul className='flex gap-4 mr-24'>
                {menu.map((e,i)=><Link key={i} to={e.url}>{e.name}</Link>)}
            </ul>
          </div>
        </nav>
    </header>
    <Outlet/>
    </>
  )
}

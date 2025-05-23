import { Bars3Icon, ChartBarIcon, HomeIcon, InformationCircleIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Nav() {
  const menu = [
    { name: "Home", url: "/", icon: HomeIcon },
    { name: "Dashboard", url: "/dashboard", icon : ChartBarIcon },
    { name: "About", url: "/about", icon: InformationCircleIcon},
  ];
  const [isOpen, setOpen] = useState(false)
  const [isHidden, setHidden] = useState(false)

  
  const [current,setCurrent] = useState("/")

  let url = location.href;
  console.log(url.split("/")[url.split("/").length-1])
  useEffect(()=>{
    if(url.split("/")[url.split("/").length-1] == "dashboard"){
      setHidden(true)
    }
  },[url])
    document.body.addEventListener('click', ()=>{
      requestAnimationFrame(()=>{
       
        if(url!==location.href){
          console.log('url changed :',location.href, " test : ",url);
          url = location.href
          setCurrent(location.href.split("/")[location.href.split("/").length-1])
        }
      });
    }, true);

  return (
    <>
      <header className={`${isHidden?" hidden":""}`}>
        {/* Lower z-index to ensure scrollbar is above */}
        <nav className={`fixed flex top-0 left-0 w-full z-40  items-center px-8  bg-neutral-100 h-14 shadow-md `}>
          <div className="flex w-full justify-between">
            <div className="text-lg font-semibold">LVM</div>
           
            <ul className="flex gap-4 mr-24 max-sm:hidden">
              {menu.map((e, i) => (
                <li key={i}>
                  <Link to={e.url} className="hover:text-blue-600">
                    {e.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
            <Bars3Icon onClick={()=>setOpen(!isOpen)} className='size-5 sm:hidden cursor-pointer'/>
        </nav>
        <ul className={`flex-col absolute py-4 ${isOpen ? "top-[3.5rem]": "-top-96"}  sm:-top-96 duration-200 ease-in-out shadow space-y-2 bg-white z-30 w-full p-2  `}>
              {menu.map((e, i) => (
                <li key={i}>
                  <Link to={e.url} onClick={()=>setTimeout(()=>setOpen(false),250)} className="hover:text-blue-600 bg-neutral-50 border rounded-lg hover:bg-neutral-100 flex items-center gap-4  p-2">
                    {<e.icon className='size-5'/>}
                    {e.name}
                  </Link>
                </li>
              ))}
        </ul>
      </header>

      {/* Push content down below navbar */}
      <main className="mt-14">
        <Outlet />
      </main>
    </>
  );
}

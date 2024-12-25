import { ArchiveBoxIcon, BanknotesIcon, CalendarDateRangeIcon, ChartBarIcon, Cog6ToothIcon, DocumentTextIcon, GlobeAltIcon, UsersIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Bars3BottomLeftIcon, BellIcon, ChevronDownIcon, ChevronLeftIcon, PlusIcon, UserIcon } from "@heroicons/react/16/solid";

import CarIcon from "../../../public/CarIcon";

import Chat from "../Chat";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export default function Sidebar({children}) {
const [isToggle,setToggle] = useState(true)
const [dropAjout,setDropAjout] = useState(false)
const [isDropProfile,setDropProfile] = useState(false)
const [isHidden,setHidden] = useState(!isToggle)
  // Notification code [END]
  const [current,setCurrent] = useState(location.href.split("/")[location.href.split("/").length-1])

  // console.log("current url : ","/"+url.split("/")[url.split("/").length-1])
  let url = location.href;

  document.body.addEventListener('click', ()=>{
    requestAnimationFrame(()=>{
      if(url!==location.href){
        console.log('url changed :',location.href, " test : ",url);
        url = location.href
        setCurrent(location.href.split("/")[location.href.split("/").length-1])
        
      }
    });
  }, true);

  useEffect(()=>{
    console.log("current: ",current)
  },[current])
const menu = [
  {name: "Dashboard", icon: ChartBarIcon , link: "/dashboard", isCurrent :  current == "dashboard"},
  {name: "Contrats", icon: DocumentTextIcon , link: "/contrats", isCurrent :  current == "contrats"},
  {name: "Reservations", icon: CalendarDateRangeIcon , link: "/reservations", isCurrent :  current == "reservations"},
  {name: "Véhicules", icon: DocumentTextIcon , link: "/vehicules", isCurrent :  current == "vehicules"},
  {name: "Clients", icon: UsersIcon , link: "/clients", isCurrent :  current == "clients"},
  {name: "Paiement", icon: DocumentTextIcon , link: "/paiement", isCurrent :  current == "paiement"},
  {name: "Charge", icon: BanknotesIcon , link: "/charge", isCurrent :  current == "charge"},
  {name: "Caisse", icon: ArchiveBoxIcon , link: "/caisse", isCurrent :  current == "caisse"},
  {name: "Contacts", icon: DocumentTextIcon , link: "/contacts", isCurrent :  current == "contacts"},
  {name: "Utilisateurs", icon: UsersIcon , link: "/utilisateurs", isCurrent :  current == "utilisateurs"},
  {name: "Paramètres", icon: Cog6ToothIcon , link: "/parametre", isCurrent :  current == "parametre"},
  {name: "Site web", icon: GlobeAltIcon , link: "/siteWeb", isCurrent :  current == "siteWeb"},

]

useEffect(()=>{
  setTimeout(()=>{
    setHidden(isToggle)
  },0)
},[isToggle])

useEffect(() => {
  setHidden(isToggle);
}, [isToggle]);

const handleOutsideClick = (event) => {
  const dropdowns = document.querySelectorAll(".dropdown");
  if (![...dropdowns].some((dropdown) => dropdown.contains(event.target))) {
    setDropAjout(false);
    setDropProfile(false);
  }
};

useEffect(() => {

  document.addEventListener("mousedown", handleOutsideClick);
  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
}, []);
  return (
    <div className="flex w-full top-0 fixed h-screen">
    <Chat/>
    <aside
      className={`flex ease-in-out  flex-col max-sm:absolute max-sm:z-50 max-sm:w-full max-sm:inset-0 ${
        !isHidden && "hidden"
      } duration-300 ${
        !isToggle ? "w-0" : "w-[20rem] min-w-[15rem]"
      } bg-white p-4`}
    >
      <div className="text-lg font-bold text-neutral-600 max-sm:flex items-center justify-between">
        <div><span className="text-blue-600">Lv</span>Manager</div>
        <button onClick={()=>setToggle(!isToggle)} className="sm:hidden" ><PlusIcon className="size-8 rotate-45 mx-2 bg-neutral-50  rounded-full p-1 "/></button>
      </div>

      <div className="mt-10 ">

    <ul className="flex flex-col gap-2 whitespace-nowrap">
      {menu?.map((e,index)=>(

          <li key={index} className="relative">
           <Link to={e?.link} className={`${e.isCurrent ? "bg-blue-600 before:absolute before:w-3.5  text-white before:bg-blue-600 before:h-full before:-left-6 before:rounded-r-md " : " hover:bg-neutral-100"}  whitespace-nowrap p-2 px-3 rounded-md w-full flex items-center gap-2`}>
           <e.icon className="size-4"/>
           {e.name}
           </Link>
          </li>
      ))}


 </ul>

 </div>
    </aside>

    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col overflow-auto flex-grow w-full"
    >
      <header className="flex items-center justify-between bg-white pr-6  p-4">
        <Bars3BottomLeftIcon
          onClick={() => setToggle(!isToggle)}
          className="cursor-pointer w-6 h-6"
        />
        <div className="flex items-center gap-4">
          <div className="relative flex flex-col items-center dropdown">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropAjout(!dropAjout);
                setDropProfile(false);
              }}
              className="flex z-40 items-center gap-2 bg-blue-600 text-white p-2 py-1 rounded-lg"
            >
              <PlusIcon className="w-4 h-4 bg-white text-blue-600 rounded-full" />
              Ajouté
            </button>
            {dropAjout && (
              <div
                className={`absolute z-30 bg-opacity-75 backdrop-blur-lg flex flex-col m-2 top-12 opacity-100 duration-200 shadow rounded-lg bg-white`}
              >
                <button className="hover:bg-neutral-100 p-2 px-4 flex items-center gap-3">
                  <DocumentTextIcon className="size-5" />
                  Contracts
                </button>
                <button className="hover:bg-neutral-100 p-2 px-4 flex items-center gap-3">
                  <CarIcon className="size-4 fill-black mt-2" />
                  Véhicule
                </button>
                <button className="hover:bg-neutral-100 p-2 px-4 flex items-center gap-3">
                  <UserIcon className="size-5" />
                  Client
                </button>
              </div>
            )}
          </div>

          <BellIcon className="size-7 cursor-pointer text-neutral-500" />
          <div className="flex relative flex-col items-center dropdown">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropProfile(!isDropProfile);
                setDropAjout(false)
              }}
              className="flex z-40 cursor-pointer items-center gap-3"
            >
              <UserIcon className="size-10 bg-neutral-300 text-white p-1 rounded-full" />
              <div>
                <div className="text-sm font-semibold text-neutral-800">
                  Salama
                </div>
                <div className="text-xs text-neutral-400">Admin</div>
              </div>
              <ChevronDownIcon className="size-5 border rounded-full text-neutral-400 cursor-pointer" />
            </button>
            {isDropProfile && (
              <div
                className={`absolute z-30 bg-opacity-75 backdrop-blur-lg flex flex-col m-2 top-[52px] opacity-100 duration-200 shadow rounded-lg bg-white`}
              >
                <button className="hover:bg-neutral-100 p-2 px-4 flex items-center gap-3">
                  <UserIcon className="size-5" />
                  Profile
                </button>
                <button className="hover:bg-neutral-100 text-nowrap p-2 px-4 flex items-center  gap-3">
                  <ChevronLeftIcon className="size-5  fill-black " />
                  Se déconneter
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

    <main className="flex-grow p-4 pl-6 pt-5 bg-gray-100 overflow-x-clip  overflow-y-auto">
     {children}
    </main>

  </div>
</div>
  )
}

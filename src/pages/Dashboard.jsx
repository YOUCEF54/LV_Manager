import { useEffect, useState } from "react";
import DropDown from "../components/DropDown";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Bars3BottomRightIcon, BellSnoozeIcon, UserIcon } from "@heroicons/react/24/solid";
import { ArrowLeftEndOnRectangleIcon, Bars3BottomLeftIcon, Bars3Icon, BellIcon, ChevronDownIcon, PlusIcon } from "@heroicons/react/16/solid";
import BestClients from "../components/cards/BestClientsCard";
import { Contracts, Reservations, TotalClients, Vehicules } from "../components/cards/Cards";
import { DocumentTextIcon } from "@heroicons/react/16/solid";
import CarIcon from "../../public/CarIcon";
import ContratsActive from "../components/cards/ContratsActiveCard";
import ReservationsCard from "../components/cards/ReservationsCard";

export default function Dashboard() {
    const headers = ""
    const [clients,setClients] = useState([])
    const handleGetClients = ()=>{
        try {
            axios.get("https://beta.lvmanager.net/tenants/",{headers}).then(response=>{
            setClients(response.data)
            console.log(response.data)
        })
        } catch (error) {
        console.log("error transaction: ",error)
        }
    }

    const [isToggle,setToggle] = useState(false)
    const [dropAjout,setDropAjout] = useState(false)
    const [isDropProfile,setDropProfile] = useState(false)
    const [timeOutDropAjout,setTimeOutDropAjout] = useState(false)
    const [timeOutDropProfile,setTimeOutDropProfile] = useState(false)
    const [isHidden,setHidden] = useState(!isToggle)


    useEffect(()=>{
      setTimeout(()=>{
        setHidden(isToggle)
      },150)
    },[isToggle])

    useEffect(()=>{
      setTimeout(()=>{
        setTimeOutDropAjout(!dropAjout)
      },100)
    },[dropAjout])

    useEffect(()=>{
      setTimeout(()=>{
        setTimeOutDropProfile(!isDropProfile)
      },100)
    },[isDropProfile])

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
      <aside className={`flex max-sm:hidden ease-in-out flex-col ${isHidden && "hidden"} duration-300 ${isToggle ? " w-0" : "w-[15rem] min-w-[12rem] "} bg-white   p-4`}>
        <div className="text-lg font-bold text-neutral-600">
          <span className="text-blue-600">Lv</span>Manager
        </div>
      </aside>

      <div className="flex flex-col overflow-auto flex-grow w-full">
        <header className="flex items-center justify-between bg-white border-l pr-6  p-4">
          <Bars3Icon
            onClick={() => setToggle(!isToggle)}
            className="cursor-pointer w-6 h-6"
          />
          <div className="flex items-center gap-4">
            <div className="relative flex flex-col items-center">
            <button onClick={()=>{setDropAjout(!dropAjout);setDropProfile(false)}} className="flex z-40 items-center gap-2 bg-blue-600 text-white p-2 py-1 rounded-lg">
              <PlusIcon className="w-4 h-4 bg-white text-blue-600 rounded-full" />
              Ajouté
            </button>
            <div className={`absolute ${timeOutDropAjout&& "hidden"} overflow-clip ease-out z-30 bg-opacity-75 backdrop-blur-lg flex flex-col m-2 ${dropAjout ? 'top-12 opacity-100' : '-top-0 opacity-0'} duration-200  shadow rounded-lg bg-white`}>
              <button className="hover:bg-neutral-100 p-2 px-4 flex items-center gap-3">
                <DocumentTextIcon className="size-5"/>
                Contracts</button>
              <button className="hover:bg-neutral-100  p-2 px-4 flex items-center  gap-3">
              <CarIcon className="size-4  fill-black mt-2" />
                Véhicule</button>
              <button className="hover:bg-neutral-100 p-2 px-4 flex items-center  gap-3">
                <UserIcon className="size-5"/>
                Client</button>
            </div>
            </div>
            <BellIcon className="size-7 cursor-pointer text-neutral-500" />
            <div className="flex relative flex-col items-center">
            <button  onClick={()=>{setDropProfile(!isDropProfile);setDropAjout(false)}} className="flex z-40 cursor-pointer items-center gap-3">
              <UserIcon className="size-10 bg-neutral-300 text-white p-1 rounded-full" />
              <div>
                <div className="text-sm font-semibold text-neutral-800">Salama</div>
                <div className="text-xs text-neutral-400">Admin</div>
              </div>
              <ChevronDownIcon className="size-5 border rounded-full text-neutral-400 cursor-pointer" />
            </button>
            <div className={`absolute  ${timeOutDropProfile&& "hidden"} overflow-clip z-30 bg-opacity-75 backdrop-blur-lg flex flex-col m-2 ${isDropProfile ? 'top-[52px] opacity-100' : '-top-0 opacity-0'} duration-200  shadow rounded-lg bg-white`}>
              <button className="hover:bg-neutral-100 p-2 px-4 flex items-center gap-3">
                <DocumentTextIcon className="size-5"/>
                Contracts</button>
              <button className="hover:bg-neutral-100 text-nowrap p-2 px-4 flex items-center  gap-3">
              <ArrowLeftEndOnRectangleIcon className="size-5  fill-black " />
                Se déconneter</button>
            </div>
            
            </div>
          </div>
        </header>

        <main className="flex-grow p-4 pl-6 pt-5 bg-gray-100 overflow-x-clip overflow-y-auto">
          <h1 className="text-3xl font-semibold text-neutral-700">Dashboard</h1>
          <div className="mt-7 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
            <TotalClients />
            <Contracts />
            <Vehicules />
            <Reservations />
          </div>
          <div className="grid grid-cols-12 gap-4 max-lg:flex max-lg:flex-col">
            <ContratsActive className="rounded-2xl col-span-8 my-4 max-h-[30rem] shadow-md overflow-hidden bg-white w-full"/>
            <ReservationsCard className="rounded-2xl col-span-4 my-4 max-h-[30rem] shadow-md overflow-hidden bg-white w-full"/>
          </div>
          <BestClients className="rounded-2xl my-4 max-h-[30rem] shadow-md overflow-hidden bg-white w-full" />
        </main>

      </div>
    </div>
  );
}
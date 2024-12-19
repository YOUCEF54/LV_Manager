import { useEffect, useState } from "react";
import DropDown from "../components/DropDown";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Bars3BottomRightIcon, BellSnoozeIcon, UserIcon } from "@heroicons/react/24/solid";
import { Bars3BottomLeftIcon, Bars3Icon, BellIcon, ChevronDownIcon, PlusIcon } from "@heroicons/react/16/solid";
import BestClients from "../components/cards/BestClients";
import StatCard from "../components/cards/StatCard";

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
    const [isHidden,setHidden] = useState(!isToggle)

    useEffect(()=>{
      setTimeout(()=>{
        setHidden(isToggle)
      },150)
    },[isToggle])

  return (
    <div className="flex w-full top-0 fixed h-screen">
      <aside className={`flex max-sm:hidden ease-in-out flex-col ${isHidden && "hidden"} duration-300 ${isToggle ? " w-0" : "w-[15rem] "} bg-white   p-4`}>
        <div className="text-lg font-bold text-neutral-600">
          <span className="text-blue-600">Lv</span>Manager
        </div>
      </aside>

      <div className="flex flex-col flex-grow w-full">
        <header className="flex items-center justify-between bg-white border-l pr-6  p-4">
          <Bars3Icon
            onClick={() => setToggle(!isToggle)}
            className="cursor-pointer w-6 h-6"
          />
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-blue-600 text-white p-2 py-1 rounded-lg">
              <PlusIcon className="w-4 h-4 bg-white text-blue-600 rounded-full" />
              Ajouté
            </button>
            <BellIcon className="size-7 cursor-pointer text-neutral-500" />
            <div className="flex cursor-pointer items-center gap-3">
              <UserIcon className="size-10 bg-neutral-300 text-white p-1 rounded-full" />
              <div>
                <div className="text-sm font-semibold text-neutral-800">Salama</div>
                <div className="text-xs text-neutral-400">Admin</div>
              </div>
              <ChevronDownIcon className="size-5 border rounded-full text-neutral-400 cursor-pointer" />
            </div>
          </div>
        </header>

        <main className="flex-grow p-4 pl-6 bg-gray-100 overflow-x-clip overflow-y-auto">
        <h1 className="text-2xl font-semibold text-neutral-700">Dashboard</h1>
        <div className="mt-8 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className=" ">
            <StatCard/>
          </div>
        ))}
        </div>

        </main>
      </div>
    </div>
  );
}
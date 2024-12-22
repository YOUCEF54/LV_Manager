import { useEffect, useState } from "react";
import {UserIcon } from "@heroicons/react/24/solid";
import { ArrowLeftEndOnRectangleIcon, Bars3Icon, BellIcon, ChevronDownIcon, PlusIcon } from "@heroicons/react/16/solid";
import BestClients from "../components/cards/BestClientsCard";
import { Contracts, Reservations, TotalClients, Vehicules } from "../components/cards/Cards";
import { DocumentTextIcon } from "@heroicons/react/16/solid";
import CarIcon from "../../public/CarIcon";
import ContratsActive from "../components/cards/ContratsActiveCard";
import ReservationsCard from "../components/cards/ReservationsCard";
import RevenueChart from "../components/charts/RevenueChart";
import ContratsActiveMV from "../components/mobile respnsive tables/ContratsActiveMV";
import ReservationsMobile from "../components/mobile respnsive tables/ReservationsMobile";

export default function Dashboard() {

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
        <aside
          className={`flex max-sm:hidden ease-in-out flex-col ${
            isHidden && "hidden"
          } duration-300 ${
            isToggle ? "w-0" : "w-[15rem] min-w-[12rem]"
          } bg-white p-4`}
        >
          <div className="text-lg font-bold text-neutral-600">
            <span className="text-blue-600">Lv</span>Manager
          </div>
        </aside>
  
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col overflow-auto flex-grow w-full"
        >
          <header className="flex items-center justify-between bg-white pr-6  p-4">
            <Bars3Icon
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
                      <ArrowLeftEndOnRectangleIcon className="size-5  fill-black " />
                      Se déconneter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

        <main className="flex-grow p-4 pl-6 pt-5 bg-gray-100 overflow-x-clip  overflow-y-auto">
          <h1 className="text-3xl font-semibold text-neutral-700">Dashboard</h1>
          <div className="mt-7 mb-3 grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
            <TotalClients />
            <Contracts />
            <Vehicules />
            <Reservations />
          </div>
          <div className="grid grid-cols-12 lg:gap-8 max-lg:flex max-lg:flex-col">
            <ContratsActive className="rounded-2xl max-sm:hidden col-span-8 my-4 max-h-[30rem] shadow-md overflow-hidden bg-white w-full"/>
            <ContratsActiveMV className="rounded-2xl max-h-[18rem]  sm:hidden  my-4  overflow-hidden  w-full"/>
            <ReservationsCard className="rounded-2xl whitespace-nowrap col-span-4 my-4 max-h-[30rem] sm:p-6 sm:bg-white  overflow-hidden  w-full"/>
            
          </div>
          <RevenueChart className="bg-white  shadow-md rounded-2xl p-4 pb-0 mb-8 mt-4" />
          <BestClients className="rounded-2xl my-4 max-h-[30rem] shadow-md overflow-hidden bg-white w-full" />
        </main>

      </div>
    </div>
  );
}
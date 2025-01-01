/* eslint-disable react/prop-types */
import { ChevronDownIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import Loading from "../../public/Loading";
import { useEffect, useRef, useState } from "react";


const DropDown = ({libelle, dataset}) =>{
      const [isOpen, setIsOpen] = useState(false);
      const dropdownRef = useRef(null);
    

      const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

        useEffect(() => {
          document.addEventListener("mousedown", handleOutsideClick);
          return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
          };
        }, []);

    return (
        <div ref={dropdownRef} className="relative w-fit whitespace-nowrap">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-center items-center gap-1 text-sm text-neutral-500 border p-2 py-1 rounded-[5px] border-neutral-300 bg-neutral-50"
          >
            <div className="">
              {libelle}
            </div>
            <ChevronDownIcon className="size-4" />
          </button>
          <ul
            className={`absolute top-8 right-0 text-sm w-fit min-w-full rounded-lg shadow-md border bg-white p-1 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            {dataset?.map((e,index)=>(
                <li
                key={index}
                className="p-2 py-1 cursor-pointer rounded-md hover:bg-gray-100"
                >
                {e}
                </li>
            ))}
 
          </ul>
        </div>
    )
}

export default function Contrats() {
  const [hasFetched, setHasFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [contrats, setContrats] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(()=>{
    async function fetchContrats() {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
      };
      // if (!hasFetched){
      try {
        setIsLoading(true)
        const response = await axios.get(
          `https://beta.lvmanager.net/tenants/contrats`,
          { headers }
        );
        setIsLoading(false)
        setContrats(response.data);
        console.log("Contrats ",response.data);
        setHasFetched(true)
      } catch (error) {
        console.error(error);
      }
    // }
  }
    fetchContrats()
  },[])
  return (
    <div className="pr-2 ">
      <div onClick={()=>{setIsOpen(false)}} className={`absolute drop-shadow-lg  bg-black flex inset-0 z-50 bg-opacity-50 ${!isOpen &&" hidden"}`}>

        <div className="flex flex-col bg-white m-auto w-[30vw] p-2 rounded-lg">
          <button onClick={()=>{setSearchQuery("Ref")}} className="p-2 border border-neutral-300 hover:bg-neutral-100 bg-neutral-50 m-1 rounded-lg hover:scale-105 duration-100 ease-in-out">Ref</button>
          <button onClick={()=>{setSearchQuery("Véhicule")}} className="p-2 border border-neutral-300 hover:bg-neutral-100 bg-neutral-50 m-1 rounded-lg hover:scale-105 duration-100 ease-in-out">Véhicule</button>
          <button onClick={()=>{setSearchQuery("Client")}} className="p-2 border border-neutral-300 hover:bg-neutral-100 bg-neutral-50 m-1 rounded-lg hover:scale-105 duration-100 ease-in-out">Client</button>
          <button onClick={()=>{setSearchQuery("Status")}} className="p-2 border border-neutral-300 hover:bg-neutral-100 bg-neutral-50 m-1 rounded-lg hover:scale-105 duration-100 ease-in-out">Status</button>
        </div>
      </div>
      <div className="max-sm:flex grid grid-cols-2   max-sm:flex-col gap-2 items-center max-sm:items-start justify-between">
        <h1 className="text-3xl  font-semibold text-neutral-700">Contrats</h1>
        <div className="flex max-sm:w-full  justify-end duration-100 max-sm:mt-6  items-center gap-2 whitespace-nowrap">
          <button className="bg-blue-600 hover:bg-blue-700 rounded-md p-2 py-1 max-sm:p-2 max-sm:w-full text-white">Factures</button>
          <button className="flex items-center max-sm:gap-2 max-sm:justify-center whitespace-nowrap max-sm:p-2 pl-1 max-sm:w-full bg-blue-600 hover:bg-blue-700 rounded-md p-2 py-1 text-white">
            <PlusIcon className="size-5"/>
            Nouveau contrat</button>
        </div>
        <div className="w-full col-span-2 flex whitespace-nowrap gap-2">
          <button onClick={()=>setIsOpen(true)} className="p-2 rounded-lg h-full bg-blue-600 flex items-center gap-2 text-white">{searchQuery || "search by"}
            <ChevronDownIcon className="size-5"/>
          </button>
          <input 
            className="outline-none focus:bg-opacity-90 bg-opacity-40 duration-100 ease-in-out focus:shadow-md bg-white p-2 w-full px-3 rounded-lg border border-neutral-300 focus:border-blue-600 "
            type="text" placeholder="Search ..."/>
        </div>
      </div>
            <div className="flex gap-6 mb-4 justify-between sticky inset-0 mt-10">
                <span className="font-semibold">Filtré par</span>
                <div className="flex  items-center gap-2">
                    <DropDown libelle="Véhicules" dataset = {["Clio 4","Toyota"]}/>
                    <DropDown libelle="Véhicules" dataset = {["client01","client02"]}/>
                </div>
            </div>
        <div className="overflow-x-auto overflow-y-clip relative  bg-white shadow-md p-4 rounded-xl">
        <table className="w-full min-w-[30rem border-collapse whitespace-nowrap text-nowrap ">
        <thead>
          <tr className="bg-neutral-200 text-neutral-800 bg-opacity-70">
            <th className="p-3 rounded-l-lg font-medium">Ref</th>
            <th className="p-3 font-medium">Véhicule</th>
            <th className="p-3 font-medium">Date de départ</th>
            <th className="p-3 font-medium">Date de retour</th>
            <th className="p-3 font-medium">Client</th>
            <th className="p-3 font-medium">Paiements</th>
            <th className="p-3 font-medium">Status</th>
            <th className=" rounded-r-lg p-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 text-nowrap whitespace-nowrap">
        {isLoading ?
            <tr className="h-[2.2rem]  flex justify-center ">
              <td  className=" right-0 cursor-wait left-0 absolute overflow-clip ">
                <Loading className=" my-2  animate-spin   m-auto "/>
              </td>
            </tr>:contrats.map((e, index) => (
            <tr key={index} className="text-neutral-600">
              <td className="p-6 text-center">{e?.matricule}</td>
              <td className="p-6 text-center">{e?.libelle}</td>
              <td className="p-6 text-center justify-center flex items-center gap-2">
              {/* <CalendarDaysIcon className="size-5 fill-emerald-600"/> */}
               {e?.dateDep.split(" ")[0]}<br/>{e.dateDep.split(" ")[1]}</td>
              <td className="p-6 text-center">{e?.dateArriv.split(" ")[0]}<br/>{e?.dateArriv.split(" ")[1]}</td>
              <td className="p-6 text-center">{e?.nomClient}</td>
              <td className="px-2 text-center w-full flex flex-col flex-grow m-auto  items-center gap-1">
              <span className="bg-emerald-500 rounded-xl min-w-24  px-4  text-white h-full ">{e?.avance}DH</span>
              <span className="bg-red-500 rounded-xl px-4 min-w-24  flex-grow text-white h-full ">{e?.montantAPayer - e?.avance}DH</span>
              </td>
              <td className="px-2 text-center  ">
                  <div className=" bg-yellow-500 w-fit m-auto  text-white px-4 rounded-xl ">{e?.statut}</div>
              </td>
              <td className="p-6 text-center ">
                  <div className="w-full  px-4 rounded-xl flex items-center gap-2 ">
                  <PencilSquareIcon className="size-8 p-1 hover:bg-neutral-100 rounded-md  cursor-pointer"/>
                  <TrashIcon className="size-8 p-1 hover:bg-neutral-100 rounded-md  cursor-pointer "/>
                  </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

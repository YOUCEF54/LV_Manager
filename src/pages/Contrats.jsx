/* eslint-disable react/prop-types */
import { ChevronDownIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
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
  return (
    <div className="pr-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-neutral-700">Contrats</h1>
        <div className="flex items-center gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 rounded-md p-2 py-1 text-white">Factures</button>
          <button className="flex items-center pl-1 bg-blue-600 hover:bg-blue-700 rounded-md p-2 py-1 text-white">
            <PlusIcon className="size-5"/>
            Nouveau contrat</button>
        </div>
      </div>
            <div className="flex gap-6 mb-4 justify-between sticky inset-0 mt-10">
                <span className="font-semibold">Filtré par</span>
                <div className="flex items-center gap-2">
                    <DropDown libelle="Véhicules" dataset = {["Clio 4","Toyota"]}/>
                    <DropDown libelle="Véhicules" dataset = {["client01","client02"]}/>
                </div>
            </div>
        <div className="overflow-x-auto overflow-y-clip  bg-white shadow-md p-4 rounded-xl">
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
          {Array.from({ length: 3 }).map((_, index) => (
            <tr key={index} className="text-neutral-600">
              <td className="p-6 text-center">4</td>
              <td className="p-6 text-center">Clio 4</td>
              <td className="p-6 text-center justify-center flex items-center gap-2">
              {/* <CalendarDaysIcon className="size-5 fill-emerald-600"/> */}
                21-12-2024<br/>100:30:00</td>
              <td className="p-6 text-center">21-12-2024<br/> 100:30:00</td>
              <td className="p-6 text-center">Mohamed</td>
              <td className="px-2 text-center w-full flex flex-col flex-grow m-auto  items-center gap-1">
              <span className="bg-emerald-500 rounded-xl min-w-24  px-4  text-white h-full ">600DH</span>
              <span className="bg-red-500 rounded-xl px-4 min-w-24  flex-grow text-white h-full ">0DH</span>
              </td>
              <td className="px-2 text-center  ">
                  <div className=" bg-yellow-500 w-fit m-auto  text-white px-4 rounded-xl ">Active</div>
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

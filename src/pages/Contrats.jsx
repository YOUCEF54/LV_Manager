import { CalendarDaysIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
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
            className="flex justify-center items-center gap-1 text-sm text-neutral-500 border p-2 py-1 rounded-lg border-neutral-300 bg-neutral-50"
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
    <div>
        <h1 className="text-3xl font-semibold text-neutral-700">Contrats</h1>
            <div className="flex gap-6 mb-4 justify-between sticky inset-0 mt-10">
                Filtré par
                <div className="flex items-center gap-2">
                    <DropDown libelle="Véhicules" dataset = {["Clio 4","Toyota"]}/>
                    <DropDown libelle="Véhicules" dataset = {["client01","client02"]}/>
                </div>
            </div>
        <div className="overflow-x-auto overflow-y-clip  bg-white p-4 rounded-xl">
        <table className="w-full min-w-[30rem border-collapse whitespace-nowrap text-nowrap ">
        <thead>
          <tr className="bg-slate-200 bg-opacity-70">
            <th className="p-3 rounded-l-lg font-medium">Contrat N°</th>
            <th className="p-3 font-medium">Cient</th>
            <th className="p-3 font-medium">Véhicule</th>
            <th className=" rounded-r-lg p-3 font-medium">Return Date</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 text-nowrap whitespace-nowrap">
          {Array.from({ length: 3 }).map((_, index) => (
            <tr key={index} className="text-neutral-600">
              <td className="p-6 text-center">4</td>
              <td className="p-6 text-center">Mohamed</td>
              <td className="p-6 text-center">Clio 4</td>
              <td className="p-6 text-center flex items-center justify-center gap-1">
                <CalendarDaysIcon className="size-5 fill-emerald-600"/>
                10 Dec, 2024
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

/* eslint-disable react/prop-types */
import { ChevronDownIcon, PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useSelector,useDispatch } from 'react-redux';
import { setIsOpenNewContrat } from "../redux/newContratSlice";
import { useEffect, useState ,useRef} from "react";

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

      const [chosenEle,setChosenEle] = useState(dataset[0])

  return (
      <div ref={dropdownRef} className="relative w-full  whitespace-nowrap ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full gap-1 text-sm text-neutral-800 border p-2  rounded-lg border-neutral-400 bg-neutral-50"
        >
          <div className="">
            {libelle=="no_lib"?chosenEle: libelle}
          </div>
          <ChevronDownIcon className="size-4" />
        </button>
        <ul
          className={`absolute top-10 right-0 text-sm w-fit min-w-full rounded-lg shadow-md border bg-white p-1 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {dataset?.filter(e=>e != chosenEle)?.map((e,index)=>(
              <li
              key={index}
              onClick={()=>{setChosenEle(e);setIsOpen(false)}}
              className="p-2 py-1 cursor-pointer rounded-md hover:bg-gray-100"
              >
              {e}
              </li>
          ))}

        </ul>
      </div>
  )
}

export default function NewContract() {

    const isOpen = useSelector(state => state?.newContrat?.value?.isOpen)
    console.log("what is going on!!:",isOpen)
    const dispatch = useDispatch()
     return (
    <div className={`${isOpen ? " ":"hidden"}`}>
        <div style={{"zIndex":51}} className="absolute inset-0 flex items-center justify-center   bg-opacity-55 backdrop-blur bg-black">
            <div className="bg-white p-6 space-y-2 m-8 rounded-md w-full">
                <div style={{"zIndex":52}} className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Nouveau Contrat</h1>
                    <XMarkIcon onClick={()=>dispatch(setIsOpenNewContrat(false))} className="size-7 cursor-pointer shadow bg-neutral-50 border hover:bg-neutral-100 rounded-full p-1 "/>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <label>Localisation de départ <span className="text-red-600">*</span></label>
                        <div className="flex w-full gap-2 items-center">
                            <DropDown libelle="no_lib" dataset={["Agence","Aeroport"]}/>
                            <PlusIcon className="size-9 border p-1.5 border-neutral-400 cursor-pointer hover:bg-neutral-50 rounded-lg"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Date/Heure de Début <span className="text-red-600">*</span></label>
                        <div className="flex w-full gap-2 items-center">
                            <input type="date" className="w-full border p-2 border-neutral-400 rounded-lg py-1.5 outline-none"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Nombre des Jours <span className="text-red-600">*</span></label>
                        <div className="flex w-full gap-2 items-center">
                            <input type="number" placeholder="nombre de jours ..." className="w-full border outline-none border-neutral-400 p-2 rounded-lg"/>
                        </div>
                    <div className="flex flex-col gap-2">
                        <label>Localisation d&apos;arrivé <span className="text-red-600">*</span></label>
                        <div className="flex w-full gap-2 items-center">
                            <DropDown libelle="no_lib" dataset={["Agence","Aeroport"]}/>
                        </div>
                    </div>
                    </div>
                    <button className="mt-5 p-2 rounded-lg bg-neutral-600 text-white hover:bg-neutral-700">Trouver une vehicule</button>
                </div>
            </div>
        </div>
    </div>
  )
}

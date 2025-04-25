/* eslint-disable react/prop-types */
import { ArrowUturnLeftIcon, CalendarDateRangeIcon, ChevronDownIcon, CurrencyDollarIcon, EllipsisVerticalIcon, EyeIcon, TrashIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useEffect,useState,useRef } from "react";
import Loading from "../../public/Loading";


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
          className="flex justify-center items-center gap-1  text-sm text-neutral-500 border p-2 py-1 rounded-[5px] border-neutral-400 bg-neutral-50"
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

export default function Vehicules() {
    const [isLoading, setIsLoading] = useState(false);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)
    const [vehicules, setVehicules] = useState([])
    const [openActions, setOpenActions] = useState({vehicule : null,state : false})
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
      };
    async function fetchVehicules() {
        try {
            setIsLoading(true)
          const response = await axios.get(
            `https://beta.lvmanager.net/tenants/vehicles`,
            { headers }
          );
          setVehicules(response.data.map(e=>e.nomClient)); 
          console.log(response.data); 
          setIsLoading(false)
        } catch (error) {
          console.error(error);
        }
      }
      useEffect(()=>{
        fetchVehicules()
      },[])
  return (
    <>
        <div className="flex justify-between">
            <h1 className="text-xl font-semibold">#Véhicules</h1>
            <div className="flex items-center gap-2">
                <DropDown libelle="Gérer les..." dataset={["1","2"]}/>
                <button className="p-2 text-sm py-1 rounded-md bg-amber-500 text-white">Nouveau Véhicule</button>
            </div>
        </div>
        <div className="flex items-center gap-2 my-4">
            <DropDown libelle="Par catégories"/>
            <DropDown libelle="Par catégories"/>
            <DropDown libelle="Par catégories"/>
        </div>
        <div className="flex justify-between items-center my-2">
        <div className="flex items-center gap-1">
            show <DropDown libelle="10" dataset={[10,20,30,50]}/> entries
        </div>
        <div className="">
            search
            <input type="text" placeholder="type something..." className="p-2 ml-2 border-neutral-400 outline-none border rounded-md"/>
        </div>
        </div>
        <div>
        <table className="w-full min-w-[30rem border-collapse whitespace-nowrap text-nowrap  ">
        <thead>
          <tr className="bg-neutral-200 text-neutral-800 bg-opacity-70">
            <th className="p-3 rounded-l-lg font-medium">Réf</th>
            <th className="p-3 font-medium">Avatar</th>
            <th className="p-3 font-medium">Libelle</th>
            <th className="p-3 font-medium">Catégorie</th>
            <th className="p-3 font-medium">Marque</th>
            <th className="p-3 font-medium">Modèle</th>
            <th className="p-3 font-medium">Nº matricule</th>
            <th className="p-3 font-medium">Carburant</th>
            <th className="p-3 font-medium">Status</th>
            <th className="p-3 font-medium">Transmission</th>
            <th className=" rounded-r-lg p-3 font-medium sticky backdrop-blur-lg -right-4 bg-inherit ">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 text-nowrap whitespace-nowrap">
        {isLoading ?
            <tr className="h-[2.2rem]  flex justify-center ">
              <td  className=" right-0 cursor-wait left-0 absolute overflow-clip ">
                <Loading className=" my-2  animate-spin   m-auto "/>
              </td>
            </tr>:
            // Contrats mapping
            vehicules?.length != 0 ?
              vehicules?.map((e, index) => (
            <tr key={index} className="text-neutral-600">
              <td className="p-6 text-center">{index+1}</td>
              <td className="p-6 text-center">{e?.libelle}</td>
              <td className="p-6 text-center">{e?.libelleCat}</td>
              <td className="p-6 text-center">{e?.matricule}</td>
              <td className="p-6 text-center">Not available</td>
              <td className="p-6 text-center flex items-center">
                <span className={`size-5 rounded-full ${e?.status == "Louée" ? "bg-red-500" : "bg-green-500"}`}/>
                {e?.status}
              </td>
           
              <td className="p-6 text-center  sticky -right-4  bg-opacity-70 backdrop-blur-lg bg-white  ">
                  {/* <div className="w-full px-4  rounded-xl flex justify-end items-center gap-2 ">
                  <EyeIcon className="size-8 min-w-8 p-1 hover:bg-neutral-100 rounded-full  cursor-pointer"/>
                  <EllipsisVerticalIcon onClick={()=>setOpenActions({contrat:e?.contratId,state:!openActions.state})}  className="size-8 min-w-8 p-1 relativee hover:bg-neutral-100 rounded-full  cursor-pointer"/>
                  
                  </div> */}
              </td>
              {/* <div style={{zIndex:999}} className={`min-w-16 border rounded-lg shadow-lg border-neutral-300  bg-white h-auto absolute right-0 top-[${70*(index+1)}px]  ${(vehicules.length -index < 3) ? `bottom-[90px]` : "mt-20"} ${openActions.state && openActions.contrat == e?.contratId ? "" : "hidden"}  `}>
                    <div onClick={()=>setIsPopUpOpen(true)} className={`flex gap-2 items-center p-1 m-1 pr-2 hover:bg-neutral-100  rounded-md cursor-pointer ${e.statut == "Terminé" && "hidden"} `}>
                      <CalendarDateRangeIcon id="trash"  className="size-8 min-w-8 p-1  rounded-md  "/>
                      <div>Prolonger </div>
                    </div>
                    <div className="flex gap-2 items-center p-1 m-1 pr-2 hover:bg-neutral-100  rounded-md cursor-pointer">
                      <ArrowUturnLeftIcon onClick={()=>alert("hi guys")} id="trash"  className="size-8 min-w-8 p-1  rounded-md  "/>
                      <div>Retourner</div>
                    </div>
                    <div className="flex gap-2 items-center p-1 m-1 pr-2 hover:bg-neutral-100  rounded-md cursor-pointer">
                      <CurrencyDollarIcon onClick={()=>alert("hi guys")} id="trash"  className="size-8 min-w-8 p-1  rounded-md  "/>
                      <div>Paiement</div>
                    </div>
                    <div className="flex gap-2 items-center p-1 m-1 cursor-pointer pr-2 hover:bg-red-600 bg-red-600 text-white  rounded-md">
                      <TrashIcon onClick={()=>alert("hi guys")} id="trash"  className="size-8 min-w-8 p-1 cursor-pointer  rounded-md  "/>
                      <div>Supprimer</div>
                    </div>
                  </div> */}
            </tr>
          )) : <div className="text-center flex items-center justify-center w-full absolute my-2 p-6 rounded-md bg-red-300">Nothing to show</div>}
        </tbody>
        
      </table>
        </div>
    </>
  )
}

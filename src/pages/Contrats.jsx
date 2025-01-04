/* eslint-disable react/prop-types */
import { ArrowUturnLeftIcon, CalendarDateRangeIcon, CalendarIcon, ChevronDownIcon, CurrencyDollarIcon, EllipsisVerticalIcon, EyeDropperIcon, EyeIcon, PencilSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import Loading from "../../public/Loading";
import { useEffect, useRef, useState } from "react";
import whatsappIcon from "../../public/whatsapp.svg"

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
  const [searchQuery, setSearchQuery] = useState("");

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

  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [openActions, setOpenActions] = useState({contrat : null,state : false})

  const Prolonger = ()=>{
    return(
    <div style={{zIndex : 80}} onClick={()=>setIsPopUpOpen(false)} className={`absolute ${isPopUpOpen ? "flex" : "hidden"} bg-opacity-55 backdrop-blur-sm inset-0  items-center justify-center bg-black`}>
      <div onClick={(e)=>e.stopPropagation()} className="bg-white min-w-[25rem] p-4 rounded-xl shadow-md">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Aout de Prolongation</h2>
          <XMarkIcon onClick={()=>setIsPopUpOpen(false)} className="size-5 cursor-pointer"/>
        </div>
        <div>
          <h3>Contrat : 5</h3>
          <p>Le contrat est prolongé pour 1 an</p>
        </div>


      </div>
    </div>)
  }
  return (
    <div className="pr-2 ">
      <Prolonger/>
      {/* <div onClick={()=>{setIsOpen(false)}} className={`absolute drop-shadow-lg  bg-black flex inset-0 z-400 bg-opacity-50 ${!isOpen &&" hidden"}`}> */}

        {/* <div className="flex flex-col bg-white m-auto w-[30vw] p-2 rounded-lg">
          <button onClick={()=>{setSearchQuery("Ref")}} className="p-2 border border-neutral-300 hover:bg-neutral-100 bg-neutral-50 m-1 rounded-lg hover:scale-105 duration-100 ease-in-out">Ref</button>
          <button onClick={()=>{setSearchQuery("Véhicule")}} className="p-2 border border-neutral-300 hover:bg-neutral-100 bg-neutral-50 m-1 rounded-lg hover:scale-105 duration-100 ease-in-out">Véhicule</button>
          <button onClick={()=>{setSearchQuery("Client")}} className="p-2 border border-neutral-300 hover:bg-neutral-100 bg-neutral-50 m-1 rounded-lg hover:scale-105 duration-100 ease-in-out">Client</button>
          <button onClick={()=>{setSearchQuery("Status")}} className="p-2 border border-neutral-300 hover:bg-neutral-100 bg-neutral-50 m-1 rounded-lg hover:scale-105 duration-100 ease-in-out">Status</button>
        </div> */}
      {/* </div> */}
      <div className="max-sm:flex grid grid-cols-2   max-sm:flex-col gap-2 items-center max-sm:items-start justify-between">
        <h1 className="text-3xl  font-semibold text-neutral-700">Contrats</h1>
        <div className="flex max-sm:w-full  justify-end duration-100 max-sm:mt-6  items-center gap-2 whitespace-nowrap">
          <button className="bg-blue-600 hover:bg-blue-700 rounded-md p-2 py-1 max-sm:p-2 max-sm:w-full text-white">Factures</button>
          <button className="flex items-center max-sm:gap-2 max-sm:justify-center whitespace-nowrap max-sm:p-2 pl-1 max-sm:w-full bg-blue-600 hover:bg-blue-700 rounded-md p-2 py-1 text-white">
            <PlusIcon className="size-5"/>
            Nouveau contrat</button>
        </div>
       
      </div>
            <div className="flex gap-6 mb-4 justify-between sticky z-50 inset-0 mt-10">
                <span className="font-semibold">Filtré par</span>
                <div className="flex  items-center gap-2 ">
                    <DropDown libelle="Véhicules" dataset = {["Clio 4","Toyota"]}/>
                    <DropDown libelle="Véhicules" dataset = {["client01","client02"]}/>
                </div>
            </div>
            <div className=" mb-2 flex justify-end">
              <div className="flex whitespace-nowrap gap-2 w-1/3">
                {/* <button onClick={()=>setIsOpen(true)} className="p-2 rounded-lg h-full bg-blue-600 flex items-center gap-2 text-white">{searchQuery || "search by"}
                  <ChevronDownIcon className="size-5"/>
                </button> */}
                <input 
                  onChange={(e)=>{setSearchQuery(e.target.value)}}                
                  className="outline-none focus:bg-opacity-90 z-500 bg-opacity-40 duration-100 ease-in-out focus:shadow-md bg-white p-1 w-full px-3 rounded-md border border-neutral-300 focus:border-blue-600 "
                  type="text" placeholder="Search ..."/>
                </div>
          </div>
        <div className="overflow-x-auto  min-h-[25rem]  overflow-y-clip relative  bg-white shadow-md p-4 rounded-xl">
          
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
            <th className=" rounded-r-lg p-3 font-medium sticky backdrop-blur-lg -right-4 bg-inherit ">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 text-nowrap whitespace-nowrap">
        {isLoading ?
            <tr className="h-[2.2rem]  flex justify-center ">
              <td  className=" right-0 cursor-wait left-0 absolute overflow-clip ">
                <Loading className=" my-2  animate-spin   m-auto "/>
              </td>
            </tr>:
            contrats.filter((e)=>e.libelle.includes(searchQuery)).length != 0 ?(contrats.filter((e)=>e.libelle.includes(searchQuery))).map((e, index) => (
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
              <td className="p-6 text-center sticky -right-4  bg-opacity-70 backdrop-blur-lg bg-white  ">
                  <div className="w-full px-4 rounded-xl flex justify-center items-center gap-2 ">
                  <EyeIcon className="size-8 min-w-8 p-1 hover:bg-neutral-100 rounded-full  cursor-pointer"/>
                  <a className="size-8 min-w-8 p-[6px] hover:bg-neutral-100 rounded-full  cursor-pointer" aria-label="Chat on WhatsApp" href="https://wa.me/1XXXXXXXXXX"> <img alt="Chat on WhatsApp" src={whatsappIcon} /></a>
                  <EllipsisVerticalIcon onClick={()=>setOpenActions({contrat:1,state:!openActions.state})}  className="size-8 min-w-8 p-1 hover:bg-neutral-100 rounded-full  cursor-pointer"/>
                  <div className={`min-w-16 border rounded-lg shadow-lg border-neutral-300  bg-white h-auto absolute right-4 top-[70px] ${openActions.state && openActions.contrat == 1 ? "" : "hidden"} `}>
                    <div onClick={()=>setIsPopUpOpen(true)} className="flex gap-2 items-center p-1 m-1 pr-2 hover:bg-neutral-100  rounded-md cursor-pointer">
                      <CalendarDateRangeIcon   id="trash"  className="size-8 min-w-8 p-1  rounded-md  "/>
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
                  </div>
                  </div>
              </td>
            </tr>
          )) : <div className="text-center flex items-center justify-center w-full absolute my-2 p-6 rounded-md bg-red-300">Nothing to show</div>}
        </tbody>
      </table>
      </div>
    </div>
  )
}

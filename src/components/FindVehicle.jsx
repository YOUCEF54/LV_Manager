
import { useSelector } from "react-redux"
import Seat from "../../public/car-seat.svg"
import Door from "../../public/car-door.svg"
import Ac from "../../public/car-ac.svg"
import Fuel from "../../public/fuel.svg"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function FindVehicle() {
  const LocalisationData = useSelector(state => state?.newLocalisation?.value)
  const[vehicles,setVehicles] = useState([])
  console.log("Local:: ",LocalisationData)
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
  };
  async function fetchVehicles() {
    try {
      const response = await axios.get(
        `https://beta.lvmanager.net/tenants/contrats/AvailableVehicles?startDate=${LocalisationData?.depart}&numDays=${LocalisationData?.nombreJours}`,
        { headers }
      );
      setVehicles(response.data.available); 
      console.log("some vehicles: ",response.data.available); 
    } catch (error) {
      console.error("Vehicles error :",error);
    }
  }

  useEffect(()=>{
    fetchVehicles()
  },[])

  return (
    <>
    <div className="flex items-center justify-between ">
    <h1 className="font-bold text-lg my-2 mb-4">#Nouveau Contrat</h1>
    <button className="bg-amber-400 p-2 h-fit  rounded-md border border-black py-1">Annuler Contratl</button>
    </div>

    <div className="flex flex-row-reverse max-md:flex-col gap-2">
    <div className="p-3 bg-white h-fit  min-w-[15rem] rounded-xl border text-neutral-800 border-gray-300">
      <h1 className=" font-semibold mb-2">Informations de départ</h1>
      <ul className="space-y-2">
        <li className="flex gap-2 flex-wrap">Location : <span  className=" font-mono px-1 py-0.5 bg-gray-100 rounded-md border border-gray-400 mb-2">Agence</span></li>
        <li className="flex gap-2 flex-wrap">Date & Heur : <span  className=" font-mono px-1 py-0.5 bg-gray-100 rounded-md border border-gray-400 mb-2">21-02-2025 16:30</span></li>
      </ul>
      <hr className="mt-4"></hr>
      <h1 className=" font-semibold my-2">Informations d&apos;arrivée</h1>
      <ul className="space-y-2">
        <li className="flex gap-2 flex-wrap">Location : <span className=" font-mono px-1 py-0.5 bg-gray-100 rounded-md border border-gray-400 mb-2">Aeroport</span></li>
        <li className="flex gap-2 flex-wrap">Date & Heur : <span className=" font-mono px-1 py-0.5 bg-gray-100 rounded-md border border-gray-400 mb-2">21-02-2026 16:30</span></li>
      </ul>
      <hr/>
      <Link to={"/admin/contrats"}>
        <button  className="min-w-52 p-1 w-full rounded-lg bg-gray-200 my-2 border border-gray-500 ">Editer</button>
        </Link>
      <hr/>
      <h1 className=" font-semibold mb-2">Filter les véhicules</h1>
      <div className="font-medium">Catégories des véhicules</div>
      <div className="flex items-center gap-2">
        <input id="eco" type="checkbox"/>
        <label htmlFor="eco">Economique</label>
      </div>
      <div className="font-medium">Marques des Véhicules</div>
      <div className="flex items-center gap-2">
        <input id="dacia" type="checkbox"/>
        <label htmlFor="eco">Dacia</label>
      </div>
      <div className="flex items-center gap-2">
        <input id="jeep" type="checkbox"/>
        <label htmlFor="eco">Jeep</label>
      </div>
      <hr/>
        <button className="px-3 p-1 rounded-lg bg-gray-200 my-2 border border-gray-500 w-full">Filtrer</button>

    </div>
    <div className="gridlg:grid-cols-2 h-fit flex gap-2">
      {vehicles?.map((e,index)=>(
 <div key={index} className="flex  max-sm:flex-col items-center rounded-xl bg-white overflow-clip border shadow-md border-gray-300">
 <div className="p-2 min-w-[15rem] relative max-sm:w-full border-dashed h-full flex items-center m-auto  sm:border-r-2 max-sm:border-b-2 ">
     <div className="px-2 py-1  bottom-2 right-2 left-2 text-white text-center rounded-md bg-gray-800  absolute min-w-fit">{e?.matricule}</div>
     <img className=" m-auto  object-cover max-w-[30rem] w-full " src={e?.image_url}/>
 </div>
 <div className="m-2 min-w-[15rem] overflow-x-auto">
     <div className="flex justify-between gap-2">
       <div className="space-y-2 mb-2">
       <div>{e?.libelleMarque}</div>
       <div className="bg-gray-100 text-gray-600 px-2 rounded-md border border-gray-300 w-fit">{e?.libelleCat}</div>
       </div>
       <div className="space-y-2 mb-2  rounded-xl 1border 1bg-blue-50 p-2 w-fit   1border-blue-200">
       <div>{e.prixJournelle * LocalisationData?.nombreJours}</div>
       <div>MAD/Total</div>
       <div className=" text-white w-fit px-3 bg-red-500 font-semibold p-1 text-center rounded-lg">{LocalisationData?.nombreJours} Jours</div>
       </div>
       
     </div>

     <div className="flex flex-wrap gap-2">
       <div className="bg-gray-300 border border-gray-300 flex items-center gap-2 bg-opacity-25 p-2 rounded-md">
         <div className="flex flex-col">Sièges<span>{e?.NbPlaces}</span></div>
         <img className="size-11 bg-gray-300 border border-gray-300 bg-opacity-35 rounded-lg p-2  " src={Seat}/>
       </div>
       <div className="bg-gray-300 border border-gray-300 flex items-center gap-2 bg-opacity-25 p-2 rounded-md">
         <div className="flex flex-col">Portes<span>{e?.NbPortes}</span></div>
         <img className="size-11 bg-gray-300 border border-gray-300 bg-opacity-35 rounded-lg p-2" src={Seat}/>
       </div>
       <div className="bg-gray-300 border border-gray-300 flex justify-around items-center gap-2 bg-opacity-25 p-2 rounded-md">
         <div className="flex flex-col">A/C</div>
         <img className="size-11 bg-gray-300 border border-gray-300 bg-opacity-35 rounded-lg p-2" src={Ac}/>
       </div>
       <div className="bg-gray-300 border border-gray-300 flex items-center gap-2 bg-opacity-25 p-2 rounded-md">
         <div className="flex flex-col">{e?.transmission}</div>
         <img className="size-11 bg-gray-300 border border-gray-300 bg-opacity-35 rounded-lg p-2  " src={Seat}/>
       </div>
       <div className="bg-gray-300 border border-gray-300 flex items-center gap-2 bg-opacity-25 p-2 rounded-md">
         <div className="flex flex-col">{e?.carburant}</div>
         <img className="size-11 bg-gray-300 border border-gray-300 bg-opacity-35 rounded-lg p-2  " src={Seat}/>
       </div>

     </div>
     <div className="mt-2 flex items-center text-nowrap gap-2">
        <button className="bg-blue-500 w-full  text-white px-2 p-1 rounded-lg">Louer</button>
       </div>
 </div>
</div>
      ))}
       
    </div>
    </div>
    
    </>
  )
}

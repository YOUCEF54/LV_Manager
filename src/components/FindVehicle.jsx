
import { useSelector } from "react-redux"
import Seat from "../../public/car-seat.svg"
import Door from "../../public/car-door.svg"
import Ac from "../../public/car-ac.svg"
import Fuel from "../../public/fuel.svg"

export default function FindVehicle() {
  const LocalisationData = useSelector(state => state?.newLocalisation?.value)
  console.log("Local:: ",LocalisationData)

  return (
    <>
    <div className="flex items-center justify-between ">
    <h1 className="font-bold text-lg my-2 mb-4">#Nouveau Contrat</h1>
    <button className="bg-amber-400 p-2 h-fit  rounded-md border border-black py-1">Annuler Contratl</button>
    </div>

    <div className="flex flex-row-reverse max-sm:flex-col gap-2">
    <div className="p-3 bg-white  min-w-[15rem] rounded-xl border text-neutral-800 border-gray-300">
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
    </div>
    <div className="grid lg:grid-cols-2 gap-2">
      {Array.from({ length: 10 }).map((index,e)=>(
 <div key={index} className="flex max-sm:flex-col items-center rounded-xl bg-white overflow-clip border shadow-md border-gray-300">
 <div className=" relative max-sm:w-full border-dashed h-full flex items-center m-auto  sm:border-r-2 max-sm:border-b-2 ">
     <div className="px-2 rounded bottom-0 backdrop-blur-md  bg-opacity-15 absolute bg-white ">55454</div>
     <img className=" m-auto  object-cover max-w-[30rem] w-full " src="data:image/jpeg;base64,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"/>
 </div>
 <div className="m-2">
     <div className="grid grid-cols-2 gap-2">
       <div className="space-y-2 mb-2">
       <div>Peugeot 208</div>
       <div className="bg-gray-100 text-gray-600 px-2 rounded-md border border-gray-300 w-fit">Economique</div>
       </div>
       <div className="space-y-2 mb-2">
       <div>3600.00</div>
       <div>MAD/Total</div>
       </div>
     </div>

     <div className="flex flex-wrap gap-2">
       <div className="bg-gray-300 border border-gray-300 flex items-center gap-2 bg-opacity-25 p-2 rounded-md">
         <div className="flex flex-col">Siege<span>5</span></div>
         <img className="size-11 bg-gray-300 border border-gray-300 bg-opacity-35 rounded-lg p-2  " src={Seat}/>
       </div>
       <div className="bg-gray-300 border border-gray-300 flex items-center gap-2 bg-opacity-25 p-2 rounded-md">
         <div className="flex flex-col">Portes<span>4</span></div>
         <img className="size-11 bg-gray-300 border border-gray-300 bg-opacity-35 rounded-lg p-2  " src={Seat}/>
       </div>
       <div className="bg-gray-300 border border-gray-300 flex justify-around items-center gap-2 bg-opacity-25 p-2 rounded-md">
         <div className="flex flex-col">A/C</div>
         <img className="size-11 bg-gray-300 border border-gray-300 bg-opacity-35 rounded-lg p-2  " src={Ac}/>
       </div>
       <div className="bg-gray-300 border border-gray-300 flex items-center gap-2 bg-opacity-25 p-2 rounded-md">
         <div className="flex flex-col">Siege<span>5</span></div>
         <img className="size-11 bg-gray-300 border border-gray-300 bg-opacity-35 rounded-lg p-2  " src={Seat}/>
       </div>
       <div className="bg-gray-300 border border-gray-300 flex items-center gap-2 bg-opacity-25 p-2 rounded-md">
         <div className="flex flex-col">Siege<span>5</span></div>
         <img className="size-11 bg-gray-300 border border-gray-300 bg-opacity-35 rounded-lg p-2  " src={Seat}/>
       </div>

     </div>
 </div>
</div>
      ))}
       
    </div>
    </div>
    
    </>
  )
}

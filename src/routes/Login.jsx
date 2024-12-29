import { ChevronDownIcon, ChevronUpIcon, EnvelopeIcon, EyeIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Login() {
  const [isEyeOn,setIsEyeOn] = useState(false);
  const [isUp,setIsUp] = useState(false);
  return (
    <div className="flex items-center  max-sm:flex-col bg-gradient-to-b from-blue-500 via-blue-700 to-blue-900 h-screen overflow-y-auto">
        <div className={`${isUp ? " h-0":"h-full"} duration-150 ease-in-out  px-6 flex items-center flex-col justify-center text-white   m-auto  max-sm:w-full w-1/2`}>
          
          <div className="flex flex-col gap-4 justify-center">
            <h1 className="text-4xl font-bold">LVManager</h1>
            <p className=" text-lg font-light">Maîtrisez chaque trajet, optimisez chaque gestion...</p>
          </div>
        </div>
        <div className={`sm:w-1/2 w-full h-full duration-100 ease-in-out  shadow-xl relative  bg-white ${isUp ? "rounded-t-0" : "rounded-t-3xl"}   m-auto flex justify-center text-neutral-500`}>
          <div className="flex   flex-col gap-2 justify-center">
        <ChevronUpIcon onClick={()=>setIsUp(!isUp)} className={`size-8 sm:hidden bg-neutral-100 rounded-full mx-auto absolute top-4 hover:scale-105 duration-75 cursor-pointer left-0 right-0 ${isUp ? " rotate-180" : "rotate-0"} duration-150 ease-in-out text-neutral-500`} />
          <h1 className="text-center mb-8 text-xl font-semibold text-neutral-700">Bienvenue!</h1>
            <div className="relative flex items-center">
              <EnvelopeIcon className={`size-5 cursor-pointer absolute left-3 fill-neutral-300`}/>
              <input type="email" placeholder="username" className="p-2 px-4 pl-10 w-full border border-neutral-300  rounded-full outline-none "/>
            </div>
            <div className="relative flex  items-center">
              <LockClosedIcon className={`size-5 cursor-pointer absolute left-3  fill-neutral-300`}/>
              <input type={isEyeOn ? "password" : "text"} placeholder="password" className="p-2 pl-10 pr-8 border border-neutral-300 rounded-full outline-none "/>
              <EyeIcon onClick={()=>setIsEyeOn(!isEyeOn)} className={`size-5 cursor-pointer absolute right-3 ${!isEyeOn ? "fill-neutral-400" : "fill-neutral-300"}`}/>
            </div>
            <input type="submit" value={"Login"} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 cursor-pointer"/>
            <a className="text-center text-sm hover:underline cursor-pointer">Mot de passe oublié?</a>
          </div>
        </div>
    </div>
  )
}

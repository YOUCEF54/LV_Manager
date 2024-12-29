import { EnvelopeIcon, EyeIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Login() {
  const [isEyeOn,setIsEyeOn] = useState(false);
  return (
    <div className="flex bg-white">
        <div className=" bg-gradient-to-b px-6  flex items-center flex-col justify-center text-white from-blue-500 via-blue-700 to-blue-900  m-auto h-screen w-1/2">
          
          <div className="flex flex-col gap-4 justify-center">
            <h1 className="text-4xl font-bold">LVManager</h1>
            <p>Maîtrisez chaque trajet, optimisez chaque gestion...</p>
          </div>
        </div>
        <div className="w-1/2 m-auto flex justify-center text-neutral-500">
          <div className="flex   flex-col gap-2 justify-center">
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

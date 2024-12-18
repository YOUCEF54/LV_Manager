import { useState } from "react";
import DropDown from "../components/DropDown";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
    const headers = ""
    const [clients,setClients] = useState([])
    const handleGetClients = ()=>{
        try {
            axios.get("https://beta.lvmanager.net/tenants/",{headers}).then(response=>{
            setClients(response.data)
            console.log(response.data)
        })
        } catch (error) {
        console.log("error transaction: ",error)
        }
    }
  return (
    <div className="flex h-full bottom-0 absolute justify-center inset-0 ">
    <div className="rounded-lg mx-14 min-w-[5rem] shadow-md overflow-auto  p-4 bg-white w-fit   m-auto">
        <div className="flex sticky left-0 mb-4 items-center justify-between">
            <h1 className="font-semibold text-xl ">Best clients</h1>
            <div className=" right-0"><DropDown/></div>
      
        </div>
      <table className="w-full min-w-[49rem]  overflow-hidden ">
        <thead>
          <tr>
            <th className="p-3 font-medium bg-slate-200 rounded-l-lg">Full Name</th>
            <th className="p-3 font-medium bg-slate-200">Telephone</th>
            <th className="p-3 font-medium bg-slate-200">Identification</th>
            <th className="p-3 font-medium bg-slate-200">N permis</th>
            <th className="p-3 font-medium bg-slate-200">Amount</th>
            <th className="p-3 font-medium bg-slate-200 rounded-r-lg">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <tr key={index}>
              <td className="p-6 flex gap-2 items-center justify-between">
                <UserCircleIcon className="size-9 "/>
                Salama Aazzat
                </td>
              <td className="p-6">+440800000</td>
              <td className="p-6">SH101010</td>
              <td className="p-6">423</td>
              <td className="p-6">1000DH</td>
              <td className="p-4 ">
              {
                (index != 2)?
                <span className="bg-emerald-500 font-medium text-white py-1 px-6 rounded-full">Active</span>
                :
                <span className="bg-red-500 font-medium text-white py-1 px-4  rounded-full">Rejected</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
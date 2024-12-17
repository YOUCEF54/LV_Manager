import { useState } from "react";
import DropDown from "../components/DropDown";
import axios from "axios";

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
    <div className="rounded-lg mt-16 p-4 bg-white w-fit m-auto">
        <div className="flex mb-4 items-center justify-between">
            <h1 className="font-semibold text-xl ">Best clients</h1>
            <DropDown/>
        </div>
      <table className=" ">
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
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <td className="p-2">Test {index + 1}</td>
              <td className="p-2">Test {index + 1}</td>
              <td className="p-2">Test {index + 1}</td>
              <td className="p-2">Test {index + 1}</td>
              <td className="p-2">Test {index + 1}</td>
              <td className="p-2">Test {index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
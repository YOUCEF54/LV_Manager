import  { useEffect, useRef, useState } from "react";
import useInView from "../../hooks/useInView";
import Loading from "../../../public/Loading"
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/16/solid";

// eslint-disable-next-line react/prop-types
export default function BestClients({className}) {
  const ref = useRef();
  const isInView = useInView(ref);
  const [topClients, setTopClients] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchTopClients() {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer 2|np6CGgKypqpac9qR6yWI58cwEKsZwqrBnFiKcTere9286d94`,
      };
      
        try {
          setIsLoading(true);
          const response = await axios.get(
            `https://beta.lvmanager.net/tenants/analytics/topClients_vehicles`,
            { headers }
          );
          setIsLoading(false);
          setTopClients(Array(response.data.topClients)[0]);
          console.log("Top Clients: ",response);
          setHasFetched(true)
        } catch (error) {
          console.error(error);
        }
      }

    if (isInView && !hasFetched) {
      fetchTopClients();
      console.log("bestClient is in View!")
    }
  }, [isInView, hasFetched]);
  return (
    <div ref={ref} className={`flex flex-col p-6 min-h-60 ${className}`}>
      <div className="flex sticky left-0 top-0 bg-white filter-none backdrop-blur-lg bg-opacity-50 pb-6  right-0  items-center justify-between">
        <h1 className="font-semibold text-xl">Meilleurs clients</h1>
        <div className="right-0">
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-clip relative">
        <table className="w-full min-w-[50rem] border-collapse ">
          <thead>
            <tr className="bg-slate-200 bg-opacity-70">
              <th className="rounded-l-lg font-medium">Full Name</th>
              <th className="p-3 font-medium">Telephone</th>
              <th className="p-3 font-medium">Identification</th>
              <th className="p-3 font-medium">N permis</th>
              <th className="p-3 font-medium">Amount</th>
              <th className="p-3 font-medium rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 ">
            {isLoading ?
            <tr className="h-[2.2rem]  flex justify-center ">
              <td  className=" right-0 cursor-wait left-0 absolute overflow-clip ">
                <Loading className=" my-2  animate-spin   m-auto "/>
              </td>
            </tr>:
            topClients.map((e, index) => (
              <tr key={index} className="text-neutral-600">
                <td className="p-6 flex justify-center gap-4 items-center">
                  <UserCircleIcon className="size-9" />
                  {e.clientName}
                </td>
                <td className="p-6 text-center">{e.tel}</td>
                <td className="p-6 text-center">{e.cin}</td>
                <td className="p-6 text-center">{e.permis}</td>
                <td className="p-6 text-center">{e.totalAmountSpent}DH</td>
                <td className="p-4 text-center">
                  {e.statutCl == "Active" ? (
                    <span className="bg-emerald-500 font-medium text-white py-1 px-6 rounded-full">Active</span>
                  ) : (
                    <span className="bg-red-500 font-medium text-white py-1 px-4 rounded-full">Rejected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

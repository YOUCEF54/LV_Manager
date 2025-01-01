import  { useEffect, useRef, useState } from "react";
import useInView from "../../hooks/useInView";
import axios from "axios";

import LoadingIcon from "../../../public/Loading";
// eslint-disable-next-line react/prop-types
export default function TopVehicules({className}) {
  const ref = useRef();
  const isInView = useInView(ref);
  const [topVehicules, setTopVehicules] = useState([]);
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
          setIsLoading(false)
          setTopVehicules(Array(response.data.topVehicules)[0]);
          setHasFetched(true)
        } catch (error) {
          console.error(error);
        }
      }

    if (isInView && !hasFetched) {
      fetchTopClients();
      console.log("top vehicules is in View!")
    }
  }, [isInView, hasFetched]);

  return (
    <div ref={ref} className={`flex flex-col p-6 min-h-60 ${className}`}>
      <div className="flex sticky left-0 top-0 bg-white filter-none backdrop-blur-lg bg-opacity-50 pb-6  right-0  items-center justify-between">
        <h1 className="font-semibold text-xl">Meilleurs véhicules</h1>
        <div className="right-0">
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-clip  relative">
        <table className="w-full  min-w-[50rem] border-collapse ">
          <thead>
            <tr className="bg-slate-200 bg-opacity-70">
              <th className="rounded-l-lg font-medium">Véhicule</th>
              <th className="p-3 font-medium">Nombre de contrats</th>
              <th className="p-3 font-medium">Nombre de jours loué</th>
              <th className="p-3 font-medium">Montant</th>
              <th className="p-3 font-medium rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y-2">
          {isLoading ?
            <tr className="h-[2.2rem]  flex justify-center ">
              <td  className=" right-0 cursor-wait left-0 absolute overflow-clip ">
                <LoadingIcon className=" my-2  animate-spin   m-auto "/>
              </td>
            </tr>:topVehicules?.map((e, index) => (
              <tr key={index} className="text-neutral-600">
                <td className="p-6 text-center">{e.libelle}</td>
                <td className="p-6 text-center">{e.nbrContrats}</td>
                <td className="p-6 text-center">{e.daysRented}</td>
                <td className="p-6 text-center">{e.totalRevenues}DH</td>
                <td className="p-4 text-center">
                  {e.status == "Disponible" ? (
                    <span className="bg-emerald-500 font-medium text-white py-1 px-6 rounded-full">{e.status}</span>
                  ) : (
                    <span className="bg-red-500 font-medium text-white py-1 px-4 rounded-full">{e.status}</span>
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

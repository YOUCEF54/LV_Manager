import BestClients from "../components/cards/BestClientsCard";
import { Contracts, Reservations, TotalClients, Vehicules } from "../components/cards/Cards";

import ContratsActive from "../components/cards/ContratsActiveCard";
import ReservationsCard from "../components/cards/ReservationsCard";
import RevenueChart from "../components/charts/RevenueChart";
import GantChart from "../components/charts/GantChart";
import TopVehicules from "../components/cards/TopVehiculesCard";

export default function Dashboard() {

    return (
      <div className="">
          <h1 className="text-3xl font-semibold text-neutral-700">Dashboard</h1>
          <div className="mt-7 mb-3 grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
            <TotalClients />
            <Contracts />
            <Vehicules />
            <Reservations />
          </div>
          <div className="grid grid-cols-12 lg:gap-8 max-lg:flex max-lg:flex-col">
            <ContratsActive className="rounded-2xl max-sm:hiddenn col-span-8 my-4 max-h-[30rem] shadow-md overflow-hidden bg-white w-full"/>
            {/* <ContratsActiveMV className="rounded-2xl max-h-[18rem]  sm:hidden  my-4  overflow-hidden  w-full"/> */}
            <ReservationsCard className="rounded-2xl whitespace-nowrap col-span-4 my-4 max-h-[30rem]d sm:p-6 sm:bg-white  overflow-hidden  w-full"/>
            
          </div>
          <RevenueChart className="bg-white  shadow-md rounded-2xl p-4 pb-0 mb-8 mt-4" />
          <GantChart/>
          <BestClients className=" whitespace-nowrap rounded-2xl my-4 max-h-[30rem] shadow-md overflow-hidden bg-white w-full" />
          <TopVehicules className="rounded-2xl my-4 max-h-[30rem] shadow-md overflow-hidden bg-white w-full" />

    </div>
  );
}
import { CalendarDateRangeIcon, DocumentTextIcon, UsersIcon } from "@heroicons/react/16/solid";
import CarIcon from "../../../public/CarIcon";

export function TotalClients() {
  return (
    <div className="flex  justify-between p-5 gap-5 bg-white rounded-2xl border-[0.2px] border-gray-200 shadow">
      <div className="flex-col">
        <div className="text-neutral-600 mb-4">Total clients</div>
        <span className="text-2xl text-neutral-800 font-semibold">22</span>
      </div>
      <UsersIcon className="size-16 min-w-16  bg-blue-100 rounded-2xl p-[.8rem] fill-blue-500 mt-2" />
    </div>
  );
}

export function Contracts() {
  return (
    <div className="flex text-nowrap justify-between p-5 gap-5 bg-white rounded-2xl border-[0.2px] border-gray-200 shadow">
      <div className="flex-col">
        <div className="text-neutral-600 mb-4">Contracts</div>
        <span className="text-2xl text-neutral-800 font-semibold">15</span>
      </div>
      <DocumentTextIcon className="size-16 bg-violet-100 rounded-2xl p-[.8rem] fill-violet-500 mt-2" />
    </div>
  );
}

export function Vehicules() {
  return (
    <div className="flex text-nowrap justify-between p-5 gap-5 bg-white rounded-2xl border-[0.2px] border-gray-200 shadow">
      <div className="flex-col">
        <div className="text-neutral-600 mb-4">Vehicules</div>
        <span className="text-2xl text-neutral-800 font-semibold">8</span>
      </div>
      <CarIcon className="size-16 bg-[#F48F14] bg-opacity-20 rounded-2xl p-[1rem] fill-[#F48F14] mt-2" />
    </div>
  );
}

export function Reservations() {
  return (
    <div className="flex  justify-between p-5 gap-5 bg-white rounded-2xl border-[0.2px] border-gray-200 shadow">
      <div className="flex-col">
        <div className="text-neutral-600 mb-4">Reservations</div>
        <span className="text-2xl text-neutral-800 font-semibold">30</span>
      </div>
      <CalendarDateRangeIcon className="size-16 min-w-16 bg-green-100 rounded-2xl p-[.8rem] fill-green-500 mt-2" />
    </div>
  );
}

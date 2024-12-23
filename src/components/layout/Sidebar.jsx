import { CalendarDateRangeIcon, ChartBarIcon, DocumentTextIcon } from "@heroicons/react/16/solid";

export default function Sidebar() {
  return (
    <div className="mt-10 ">
        <ul className="flex flex-col gap-2">
            <li className="relative">
              <button className="bg-blue-600 before:absolute before:w-3.5 before:bg-blue-600 before:h-full before:-left-6 before:rounded-r-md  whitespace-nowrap p-2 px-3 rounded-md w-full text-white flex items-center gap-2">
              <ChartBarIcon className="size-4"/>
              Tableau de bord</button>
            </li>
            <li className=""><button className="p-2  gap-2 hover:bg-neutral-100 w-full  flex items-center rounded-lg">
              <DocumentTextIcon className="size-4"/>Contrats</button></li>
            <li className=""><button className="p-2  gap-2 hover:bg-neutral-100 w-full  flex items-center rounded-lg">
              <CalendarDateRangeIcon className="size-4"/>Réservations</button></li>
            <li className=""><button className="p-2  gap-2 hover:bg-neutral-100 w-full  flex items-center rounded-lg">
              <CalendarDateRangeIcon className="size-4 opacity-0"/>Véhicules</button></li>
            <li className=""><button className="p-2  gap-2 hover:bg-neutral-100 w-full  flex items-center rounded-lg">
              <CalendarDateRangeIcon className="size-4 opacity-0"/>Clients</button></li>
            <li className=""><button className="p-2  gap-2 hover:bg-neutral-100 w-full  flex items-center rounded-lg">
              <CalendarDateRangeIcon className="size-4 opacity-0"/>Paiements</button></li>
            <li className=""><button className="p-2  gap-2 hover:bg-neutral-100 w-full  flex items-center rounded-lg">
              <CalendarDateRangeIcon className="size-4 opacity-0"/>Charge</button></li>
            <li className=""><button className="p-2  gap-2 hover:bg-neutral-100 w-full  flex items-center rounded-lg">
              <CalendarDateRangeIcon className="size-4 opacity-0"/>Caisse</button></li>
            <li className=""><button className="p-2  gap-2 hover:bg-neutral-100 w-full  flex items-center rounded-lg">
              <CalendarDateRangeIcon className="size-4 opacity-0"/>Contacts</button></li>
            <li className=""><button className="p-2  gap-2 hover:bg-neutral-100 w-full  flex items-center rounded-lg">
              <CalendarDateRangeIcon className="size-4 opacity-0"/>Utilisateurs</button></li>
            <li className=""><button className="p-2  gap-2 hover:bg-neutral-100 w-full  flex items-center rounded-lg">
              <CalendarDateRangeIcon className="size-4 opacity-0"/>Paramètre</button></li>
            <li className=""><button className="p-2  gap-2 hover:bg-neutral-100 w-full  flex items-center rounded-lg">
              <CalendarDateRangeIcon className="size-4 opacity-0"/>Site web</button></li>

        </ul>
    </div>
  )
}

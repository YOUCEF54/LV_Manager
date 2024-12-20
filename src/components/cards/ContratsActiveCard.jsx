import { CalendarDateRangeIcon, CalendarDaysIcon, CalendarIcon } from "@heroicons/react/16/solid";

// eslint-disable-next-line react/prop-types
export default function ContratsActive({className}) {
  return (
    <div className={`flex flex-col p-6 min-h-60 ${className}`}>
    <div className="flex sticky left-0 top-0 bg-white filter-none backdrop-blur-lg bg-opacity-50 pb-6  right-0  items-center justify-between">
      <h1 className="font-semibold text-xl">Contarats Active</h1>
      <div className="right-0">
        {/* <DropDown /> */}
      </div>
    </div>
    <div className="overflow-x-auto ">
      <table className="w-full min-w-[30rem border-collapse ">
        <thead>
          <tr className="bg-slate-200 bg-opacity-70">
            <th className="p-3 rounded-l-lg font-medium">Contrat N°</th>
            <th className="p-3 font-medium">Cient</th>
            <th className="p-3 font-medium">Véhicule</th>
            <th className=" rounded-r-lg p-3 font-medium">Return Date</th>
          </tr>
        </thead>
        <tbody className="divide-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <tr key={index} className="text-neutral-600">
              <td className="p-6 text-center">4</td>
              <td className="p-6 text-center">Mohamed</td>
              <td className="p-6 text-center">Clio 4</td>
              <td className="p-6 text-center flex items-center justify-center gap-1">
                <CalendarDaysIcon className="size-5 fill-emerald-600"/>
                10 Dec, 2024
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

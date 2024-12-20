import { UserIcon } from "@heroicons/react/16/solid";

// eslint-disable-next-line react/prop-types
export default function ReservationsCard({className}) {
  return (
    <div className={`flex flex-col p-6 min-h-60 ${className}`}>
    <div className="flex sticky left-0 top-0 bg-white filter-none backdrop-blur-lg bg-opacity-50 pb-6  right-0  items-center justify-between">
      <h1 className="font-semibold text-xl">Reservations</h1>
      <span className="text-blue-500 hover:underline cursor-pointer font-medium">Voir tous</span>
    </div>
    <div className="overflow-x-auto flex flex-col divide-y-2   ">
    {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex p-2 ">
                <div className="flex gap-4  justify-center items-center">
                    <UserIcon className="size-11  bg-neutral-300 fill-white p-2 rounded-full"/>
                    <div>
                        <h1>Mohamed Haji | +212700440440</h1>
                        <div className="text-neutral-600">ww1234 - 12/12/2024 - 3 jours</div>
                    </div>
                </div>
            </div>
          ))}
    </div>
  </div>
  )
}

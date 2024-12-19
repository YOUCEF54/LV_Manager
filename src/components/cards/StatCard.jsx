import { UsersIcon } from "@heroicons/react/16/solid";

export default function StatCard() {
  return (
    <div className="flex text-nowrap justify-between p-3 gap-4 bg-white rounded-lg">
        <div className=" flex-col  ">
            <div className="text-neutral-600 mb-2">Total clients</div>
            <span className="text-2xl text-neutral-800 font-semibold">22</span>
        </div>
        <UsersIcon className="size-11 bg-blue-100 rounded-2xl p-[8px] fill-blue-500  mt-2"/>
    </div>
  )
}

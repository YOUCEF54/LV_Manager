import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

export default function DropDown() {
    const [isdropdown,setIsdropdown] = useState(false)
  return (
    <div className="flex-col relative w-fit items-center justify-center">
        <button onClick={()=>setIsdropdown(!isdropdown)} className="p-2 outline-none py-1 flex justify-between font-normal text-sm items-center gap-2 border border-neutral-200 bg-neutral-50 text-neutral-600 w-fit rounded-md">
            DropDownV1
            <ChevronDownIcon className={`size-4 ease-in-out duration-150  ${isdropdown ? "rotate-180":"rotate-0"}`}/>
        </button>
        <ul className={`flex-col border rounded-md w-full shadow-md bg-white  absolute divide-y-2 mt-2 items-center justify-center m-auto ${isdropdown ?"":"h-0 hidden"} `}>
            <li className="p-2 ">item1</li>
            <li className="p-2 ">item2</li>
            <li className="p-2 ">item3</li>
        </ul>
    </div>
  )
}

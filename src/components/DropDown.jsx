import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

export default function DropDown() {
    const [isdropdown,setIsdropdown] = useState(false)
    const [months,setMonths] = useState([
      {id:1,name:"January"},
      {id:2,name:"February"},
      {id:3,name:"March"},
      {id:4,name:"April"},
      {id:5,name:"May"},
      {id:6,name:"June"},
      {id:7,name:"July"},
      {id:8,name:"August"},
      {id:9,name:"September"},
      {id:10,name:"October"},
      {id:11,name:"November"},
      {id:12,name:"December"},
    ])
    const [selectedMonth, setSelectedMonth] = useState(1)
  return (
    <div className="flex-col text-[14px] relative w-fit items-center justify-center">
        <button onClick={()=>setIsdropdown(!isdropdown)} className="p-2 outline-none py-1 flex justify-between font-normal  items-center gap-2 border border-neutral-200 bg-neutral-50 text-neutral-600 w-fit min-w-[8rem] rounded-md">
            {months[selectedMonth-1]?.name}
            <ChevronDownIcon className={`size-4 ease-in-out duration-150  ${isdropdown ? "rotate-180":"rotate-0"}`}/>
        </button>
        <ul className={`flex-col border rounded-md w-full shadow-md bg-white max-h-36 overflow-y-auto  absolute divide-y-2 mt-2 items-center justify-center m-auto ${isdropdown ?"":"h-0 hidden"} `}>
          {months.map((month) => (
            <label onClick={(e)=>{setSelectedMonth(month.id)}} key={month.id} htmlFor={month.id}>
              <li  className={`p-2 py-1 flex justify-between items-center duration-300 active:bg-neutral-200 hover:bg-neutral-100 ${selectedMonth == month.id ? "bg-neutral-100" : "bg-white"} `}>{month?.name}<input className=" outline-none" defaultChecked={selectedMonth == month.id} name="months" id={month.id} type="radio"/></li>
            </label>
          ))
        }
        </ul>
    </div>
  )
}

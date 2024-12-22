import { CalendarDaysIcon, PhoneIcon } from "@heroicons/react/24/solid";

export default function ReservationsMobile() {
  return (
    <div className="flex flex-col rounded-xl  overflow-clip ">
         <div>
          <img className="rounded-2xl border-2 border-black" src="autom.jpeg"/>
        </div>
        <div className="felx flex-col w-full mt-4 ">
            <div className="px-4 py-2 font-medium ">YOUCEF EL OMARI</div>
            <div className="px-4 py-2 flex items-center gap-1 ">
              <PhoneIcon className="size-[18px] fill-neutral-600"/>
              +2125050505</div>
            <div className="px-4 py-2 flex items-center gap-2 ">
              <img src="hugeicons_id.svg" className="size-5 "/>
              ww1234</div>
            <div className="px-4 py-2 text-center flex items-center  gap-1">
                <CalendarDaysIcon className="size-5 fill-emerald-600"/>
                10 Dec, 2024</div>
        </div> 
      
        
    </div>
  )
}

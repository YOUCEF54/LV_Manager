import { Calendar01Icon } from "hugeicons-react";

export default function MobileTableCardCA() {
  return (
    <div className="flex border-2 rounded-xl  overflow-clip bg-white  ">
        <div className="felx flex-col w-fit  divide-y-2 bg-neutral-50">
            <div className="p-4 ">Contrat N°</div>
            <div className="p-4 ">Cient</div>
            <div className="p-4 ">Véhicule</div>
            <div className="p-4 ">Return Date</div>
        </div>
        <div className="felx flex-col w-full divide-y-2">
            <div className="p-4 ">4</div>
            <div className="p-4 ">Mohamed</div>
            <div className="p-4 ">Clio 4</div>
            <div className="p-4 text-center flex items-center  gap-1">
                <Calendar01Icon className="size-5 fill-emerald-600"/>
                10 Dec, 2024</div>
        </div>
    </div>
  )
}

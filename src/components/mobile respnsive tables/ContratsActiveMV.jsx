import MobileTableCard from "../cards/MobileTableCard";


// eslint-disable-next-line react/prop-types
export default function ContratsActiveMV({className}) {
  return (
    <div className={`flex flex-col   whitespace-nowrap  ${className}`}>
    <div className="flex sticky left-0 top-0 bg-gray-100 pb-6  right-0  items-center justify-between">
      <h1 className="font-semibold text-xl">Contrats Active</h1>
      <span className="text-blue-500 hover:underline cursor-pointer font-medium">Voir tous</span>
    </div>
    <div className=" flex flex-col gap-6 overflow-y-auto ">
    {Array.from({length:5}).map((ele,index)=>(
        <div key={index} className="">
            <MobileTableCard/>
        </div>
        ))}
    </div>
  </div>
  )
}

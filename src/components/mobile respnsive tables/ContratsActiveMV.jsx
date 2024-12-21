import MobileTableCard from "../cards/MobileTableCard";

// eslint-disable-next-line react/prop-types
export default function ContratsActiveMV({className}) {
  return (
    <div className={`flex flex-col p-6  ${className}`}>
    <div className="flex sticky left-0 top-0 bg-white filter-none backdrop-blur-lg bg-opacity-50 pb-6  right-0  items-center justify-between">
      <h1 className="font-semibold text-xl">Contarats Active MV</h1>
      <div className="right-0">
        {/* <DropDown /> */}
      </div>
    </div>
    <div className=" flex flex-col gap-6 ">
    {Array.from({length:5}).map((ele,index)=>(
        <div key={index} className="">
            <MobileTableCard/>
        </div>
        ))}
    </div>
  </div>
  )
}

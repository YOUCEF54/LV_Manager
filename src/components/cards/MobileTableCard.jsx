
// eslint-disable-next-line react/prop-types
export default function MobileTableCard({th, td}) {
  return (
    <div className="flex border-2 rounded-xl  overflow-clip bg-white  ">
        <div className="felx flex-col w-fit divide-y-2 bg-neutral-50">
           {/* eslint-disable-next-line react/prop-types */}
          {th?.map((e,index)=>(
            <div key={index} className="p-4 ">{e}</div>
          ))}
        </div>
        <div className="felx flex-col w-full divide-y-2">
          {/* eslint-disable-next-line react/prop-types */}
          {td?.map((e,index)=>(
              <div key={index} className="p-4 ">{e}</div>
            ))}
        </div>
      
        
    </div>
  )
}

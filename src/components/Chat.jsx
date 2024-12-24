import { ChatBubbleBottomCenterIcon, ChatBubbleLeftRightIcon, ChatBubbleOvalLeftIcon, Cog8ToothIcon, CogIcon, MinusIcon, PlusIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Chat() {
    const [isOpen,setisOpen]=  useState(false);

  return (
   <div>
    <div onClick={()=>{setisOpen(!isOpen)}} className={`${isOpen ? " max-w-[90vw] w-[25rem] h-[16rem] bg-white rounded-lg shadow-md border" : "size-16 bg-orange-200 p-3 bg-opacity-75 backdrop-blur-lg hover:bg-orange-100 duration-75 cursor-pointer border border-orange-400  rounded-full"} z-50 duration-100  absolute right-4 bottom-4`}>
        <ChatBubbleLeftRightIcon className={`${isOpen?"hidden":"hover:scale-105 fill-orange-400"} max-w-16 duration-100 `}/>
        {isOpen ?
        <div onClick={(e)=>{e.stopPropagation()}}>
            <div className="flex items-center justify-between gap-2 p-2 py-4 border-b" >
                <div className="flex items-center gap-2 " >
                    <UserCircleIcon className="size-8"/>
                    <div>Youcef El Omari</div>
                </div>
                <div className="flex items-center gap-2">
                    <CogIcon className="size-6 bg-neutral-100 border border-neutral-300 rounded-full p-[2px] "/>
                    <MinusIcon className="size-6"/>
                    <PlusIcon className=" rotate-45 size-6"/>
                </div>


            </div>
            <div>
                <div className="flex items-center p-2 px-3 gap-2">
                    <UserCircleIcon className="size-6"/>
                    <div className=" p-2 bg-orange-100 rounded-lg px- relative before:absolute before:text-[12px] whitespace-nowrap before:-bottom-5 before:content-['22_Dec_2024,_1:31_PM']">Hello! How can I assist you?</div>
                </div>
            </div>
        </div>
        : null}
    </div>
   </div> 
  )
}

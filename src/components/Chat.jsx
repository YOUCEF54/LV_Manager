import { ChatBubbleLeftRightIcon,CogIcon, MinusIcon, PaperClipIcon, PlusIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Chat() {

    const [isOpen,setisOpen]=  useState(false);
    const [isClose,setIsClose]=  useState(false);

  return (
   <div>
    <div onClick={()=>{setisOpen(!isOpen)}} className={`${isOpen ? "flex flex-col max-w-[90vw] w-[25rem] mi-h-[20rem]  bg-white rounded-lg shadow-md border" : "size-14 shadow-lg bg-orange-20 p-3 bg-opacity-75 backdrop-blur-lg  hover:bg-orange-100 duration-75 cursor-pointer border border-orange-400  rounded-full"} ${isClose && "hidden"} z-50 duration-200 ease-in-out  absolute right-4 bottom-4 overflow-y-hidden`}>
        <ChatBubbleLeftRightIcon className={`${isOpen?"hidden":" hover:scale-105  fill-orange-400"}   duration-100 `}/>
        {isOpen ?
        <div onClick={(e)=>{e.stopPropagation()}}>
            <div className="flex items-center justify-between gap-2 p-2 py-4 border-b" >
                <div className="flex cursor-pointer items-center gap-2 " >
                    <UserCircleIcon className="size-8"/>
                    <div>Youcef El Omari</div>
                </div>
                <div  className="flex cursor-pointer items-center gap-2">
                    <CogIcon className="size-6 bg-neutral-100 border border-neutral-300 rounded-full p-[2px] "/>
                    <MinusIcon onClick={()=>{setisOpen(false)}} className="size-6"/>
                    <PlusIcon onClick={()=>{setIsClose(true)}} className=" rotate-45 size-6"/>
                </div>


            </div>
            <div className="flex flex-col flex-grow h-full gap-2 min-h-[20rem] overflow-y-auto">
                <div className="flex items-center p-2 px-3 gap-2">
                    <UserCircleIcon className="size-6"/>
                    <div className=" p-2 bg-orange-100 rounded-lg px- relative before:absolute before:text-[12px] whitespace-nowrap before:-bottom-5 before:content-['22_Dec_2024,_1:31_PM']">Hello! How can I assist you?</div>
                </div>
                <div className="flex items-center p-2 px-3 gap-2  right-0 w-full  justify-end  relative before:absolute before:text-[12px] whitespace-nowrap  before:-bottom-3 before:content-['22_Dec_2024,_1:31_PM']">
                    <div className=" p-2 bg-neutral-100 rounded-lg px- ">Okey</div>
                </div>
                <div className="flex items-center p-2 px-3 gap-2">
                    <UserCircleIcon className="size-6"/>
                    <div className=" p-2 bg-orange-100 rounded-lg px- relative before:absolute before:text-[12px] whitespace-nowrap before:-bottom-5 before:content-['22_Dec_2024,_1:31_PM']">Thank you?</div>
                </div>
            </div>
            <div className=" w-full h-[4rem] relative flex items-center  ">
                <input placeholder="What can we help you with?" className="outline-none relative w-full px-4 pr-16  p-2 bg-neutral-50 h-full bottom-0"/>
                <PaperClipIcon className="absolute size-9 text-neutral-800 cursor-pointer hover:bg-neutral-100 rounded-md  right-4 p-1.5"/>
            </div>
        </div>
        : null}
    </div>
   </div> 
  )
}

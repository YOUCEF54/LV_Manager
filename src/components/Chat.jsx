import {
    ChatBubbleLeftRightIcon,
    CogIcon,
    MinusIcon,
    PaperClipIcon,
    PlusIcon,
    UserCircleIcon,
} from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import echo from "../utils/echo";

export default function Chat() {
    console.log("tests are here")
    const [isOpen, setIsOpen] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    };

    // console.log("here I am : ",import.meta.env.VITE_API_TOKEN)

    useEffect(() => {
        const channel = echo.channel("chat");
        channel.listen("MessageSent", (data) => {
            setMessages((prevMessages) => [...prevMessages, data.message]);
            console.log("here are some chat messages: ",data)
        });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    const sendMessage = async () => {
        if (!messageInput.trim()) return;

        await fetch("https://beta.lvmanager.net/central-db/chat/tenant/add", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ message: messageInput,sender:"location"}),
        });

        setMessageInput("");
    };


    return (
        <div>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`${
                    isOpen
                        ? "flex flex-col max-w-[90vw] w-[25rem] min-h-[20rem] bg-white rounded-lg shadow-md border"
                        : "size-14 shadow-lg bg-orange-20 p-3 bg-opacity-75 backdrop-blur-lg hover:bg-orange-100 duration-75 cursor-pointer border border-orange-400 rounded-full"
                } ${isClose && "hidden"} z-50 duration-200 ease-in-out absolute right-4 bottom-4 overflow-y-hidden`}
            >
                <ChatBubbleLeftRightIcon
                    className={`${
                        isOpen ? "hidden" : "hover:scale-105 fill-orange-400"
                    } duration-100`}
                />
                {isOpen ? (
                    <div onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between gap-2 p-2 py-4 border-b">
                            <div className="flex cursor-pointer items-center gap-2">
                                <UserCircleIcon className="size-8" />
                                <div>Youcef El Omari</div>
                            </div>
                            <div className="flex cursor-pointer items-center gap-2">
                                <CogIcon className="size-6 bg-neutral-100 border border-neutral-300 rounded-full p-[2px]" />
                                <MinusIcon
                                    onClick={() => setIsOpen(false)}
                                    className="size-6"
                                />
                                <PlusIcon
                                    onClick={() => setIsClose(true)}
                                    className="rotate-45 size-6"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-grow h-full gap-2 min-h-[20rem] overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center p-2 px-3 gap-2 ${
                                        msg.isOwn ? "justify-end" : ""
                                    }`}
                                >
                                    {!msg.isOwn && <UserCircleIcon className="size-6" />}
                                    <div
                                        className={`p-2 ${
                                            msg.isOwn
                                                ? "bg-neutral-100"
                                                : "bg-orange-100"
                                        } rounded-lg px- relative`}
                                    >
                                        {msg.text || "Message content unavailable"}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full h-[4rem] relative flex items-center">
                            <input
                                placeholder="What can we help you with?"
                                className="outline-none relative w-full px-4 pr-16 p-2 bg-neutral-50 h-full bottom-0"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") sendMessage();
                                }}
                            />
                            <PaperClipIcon
                                className="absolute size-9 text-neutral-800 cursor-pointer hover:bg-neutral-100 rounded-md right-4 p-1.5"
                                onClick={sendMessage}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

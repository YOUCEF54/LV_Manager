/* eslint-disable no-unused-vars */
import {
    ChatBubbleLeftRightIcon,
    CogIcon,
    MinusIcon,
    PaperAirplaneIcon,
    PaperClipIcon,
    PlusIcon,
    UserCircleIcon,
} from "@heroicons/react/16/solid";

import LoadingIcon from "../../public/Loading"

import SendIcon from "../../public/SendIcon"
import { useState, useEffect } from "react";
import echo from "../utils/echo";
import axios from "axios";

import { useRef } from "react";

export default function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const [messageInput, setMessageInput] = useState("");

    const messagesEndRef = useRef(null); // Ref for the messages container

    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    };

    useEffect(() => {
        getMessages();
        const channel = echo.channel("tenant-chat.4");

        channel.listen("MessageSent", (data) => {
            console.log("Message received in real time:", data.message);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleChatToggle = () => {
        setIsOpen((prev) => !prev);
        if (!isOpen) {
            // Scroll to bottom when the chat box is opened
            setTimeout(scrollToBottom, 0); // Ensure the DOM is updated
        }
    };

    const sendMessage = async () => {
        if (!messageInput.trim()) return;

        const response = await axios.post(
            "https://beta.lvmanager.net/central-db/chat/tenant/add",
            JSON.stringify({ message: messageInput, sender: "location" }),
            { headers }
        );

        getMessages();
        setMessageInput("");
    };

    const getMessages = async () => {
        setIsLoading(true)
        setMessages([]);
        const response = await axios.get(
            "https://beta.lvmanager.net/central-db/chats/tenantMessages",
            { headers }
        );
        setIsLoading(false)

        console.log("get Messages: ", response);
        setMessages(response?.data);
        setTimeout(scrollToBottom, 0);
    };

    return (
        <div>
            <div
                onClick={handleChatToggle} // Use the new toggle handler
                className={`${
                    isOpen
                        ? "flex flex-col max-w-[90vw] w-[25rem] max-sm:w-[20rem] sm:min-h-[20rem]   bg-white rounded-lg shadow-md border"
                        : " shadow-lg bg-orange-20 p-3 bg-opacity-75 backdrop-blur-lg hover:bg-orange-100 duration-75 cursor-pointer border border-orange-400 rounded-full"
                } ${isClose && "hidden"} z-50 absolute right-4 bottom-4 overflow-y-hidden`}
            >
                <ChatBubbleLeftRightIcon
                    className={`${
                        isOpen ? "hidden" : "hover:scale-105 fill-orange-400"
                    } duration-100 size-7`}
                />
                {isOpen ? (
                    <div onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between gap-2 p-2 py-4 border-b">
                            <div className="flex cursor-pointer items-center gap-2">
                                <UserCircleIcon className="size-8" />
                                <div>Youcef El Omari</div>
                            </div>
                            <div className="mx-4">
                                <MinusIcon
                                    onClick={() => setIsOpen(false)}
                                    className="size-7 bg-neutral-50 rounded-full hover:bg-neutral-100 cursor-pointer hover:scale-105 duration-100 ease-in-out p-1"
                                />
                            </div>
                        </div>
                        <div
                            className="flex sm:max-h-[25rem] max-sm:max-h-[15rem] relative flex-col flex-grow h-full gap-2 sm:min-h-[20rem] max-sm:min-h-[15rem] overflow-y-auto"
                        >
                            <div className="">
                                {isLoading?
                                <div className="w-full h-full absolute m-auto flex items-center justify-center ">
                                    <LoadingIcon className=" size-8 animate-spin"/>
                                </div>:
                                messages?.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center p-2 px-3 gap-2 ${
                                            msg.sender == "tenant" ? "justify-end" : ""
                                        }`}
                                    >
                                        {msg.sender == "admin" && <UserCircleIcon className="size-6" />}
                                        <div
                                            className={`p-2 ${
                                                msg.sender == "admin"
                                                    ? "bg-neutral-100"
                                                    : "bg-orange-100"
                                            } rounded-lg px- relative`}
                                        >
                                            {msg?.message || "Message content unavailable"}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Ref Element to Scroll To */}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="w-full h-[4rem] relative flex items-center">
                            <input
                            type="text"
                                placeholder="What can we help you with?"
                                className="outline-none relative w-full px-4 pr-16 p-2 bg-neutral-50 h-full bottom-0"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") sendMessage();
                                }}
                            />
                            <SendIcon
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

import { useEffect } from "react";

import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../context/socketContext";
import NotificationSound from "../assets/sounds/notification.mp3";
const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(NotificationSound);
            sound.play();
            setMessages([...messages, newMessage])
        })

        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages])
}
 
export default useListenMessages;
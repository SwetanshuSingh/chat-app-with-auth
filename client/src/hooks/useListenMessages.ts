import { useContext, useEffect } from "react";
import { SocketContextType, useSocketContext } from "../context/SocketContext";
import { MessagesContext, MessagesContextType } from "../context/MessagesContext";
import notificationSound from "../assets/sounds/notification.mp3"

const useListenMessages = () => {
    const {socket} = useSocketContext() as SocketContextType;
    const { messages, setMessages } = useContext(MessagesContext) as MessagesContextType;

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...(messages ?? []), newMessage])
        })

        return () => {
            socket?.off("newMessage");
        }
    }, [socket,setMessages,messages])
}

export default useListenMessages;
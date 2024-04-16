import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";

export type SocketContextType = {
    socket? : Socket;
    onlineUsers : string[]
}

type SocketContextProviderProps = {
    children : ReactNode
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () : SocketContextType | undefined => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children} : SocketContextProviderProps) => {

    const [socket, setSocket] = useState<Socket | undefined>();
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const {auth} = useAuthContext() as AuthContextType;

    useEffect(() => {
        if(auth) {
            const socket = io("https://vondroy.onrender.com", {
                query : {
                    userId : auth.id,
                }
            });
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })

            return () => {
                if(socket){
                    socket.close();
                }
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(undefined);
            }
        }
    },[auth])

    return <SocketContext.Provider value={{socket, onlineUsers}}>
        {children}
    </SocketContext.Provider>
}
import { useContext } from "react";
import { ConversationContext, ConversationContextType } from "../context/ConversationContext";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import UserMessages from "./UserMessges";
import { useSocketContext } from "../context/SocketContext";

const UserChat = () => {
  const { selectedConversation } = useContext<ConversationContextType | null>(ConversationContext)!;
  const { auth } = useContext<AuthContextType | null>(AuthContext)!;
  const { onlineUsers } = useSocketContext() as { onlineUsers : string[] };
  const isOnline = onlineUsers.includes(selectedConversation?.id ?? "");

  return (
    <main className="bg-white px-4 py-5 w-96 h-[500px] rounded-lg flex flex-col font-0">
      {selectedConversation ? (
        <>
          <div className="left w-full flex gap-2 border-b border-gray-300 pb-2">
            <div className="profile">
              <img
                className="w-14 h-14 border border-gray-400 rounded-full box-border"
                src={selectedConversation.profilePic}
                alt="avatar"
              />
            </div>
            <div className="text text-[#353535] flex flex-col justify-center gap">
              <h3 className="text-sm font-semibold">{selectedConversation.firstname} {selectedConversation.lastname}</h3>
              {isOnline ? (<p className="text-xs text-gray-400">Online</p>) : null}
            </div>
          </div>

          <UserMessages />
        </>
      ) : (
        <div className="skeleton w-full h-full flex flex-col items-center justify-center">
          <h2 className="text-xl">Welcome {auth?.firstname} 👋</h2>
          <p className="font-light">Select to chat to start messaging</p>
        </div>
      )}
    </main>
  );
};

export default UserChat;

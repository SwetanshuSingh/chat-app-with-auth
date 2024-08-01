import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import useSendMessage from "../hooks/useSendMessage";
import MessageScreen from "./MessageScreen";

const UserMessages = () : React.JSX.Element => {

    const [message, setUserMessage] = useState('');
    const {sendMessage} = useSendMessage();
    
    const handleChange = (evt : ChangeEvent<HTMLInputElement>) => {
        setUserMessage(evt.target.value)
    }

    const handleSubmit = async(evt : FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        if(!message){
            return
        }
        await sendMessage(message)
        setUserMessage('');
    }

    return (
        <>
        
          <MessageScreen />
          <form onSubmit={(evt) => {handleSubmit(evt)}} className="w-full send-message flex gap-2">
            <input
              className="w-full border border-gray-400 outline-none rounded-md px-2 py-1"
              type="text"
              value={message}
              onChange={(evt) => {handleChange(evt)}}
            />
            <button onClick={(evt) => {handleSubmit(evt)}} className="border border-gray-600 rounded-md px-2 hover:bg-gray-900 hover:text-white">
              Send
            </button>
          </form>
          </>
    )
}

export default UserMessages;
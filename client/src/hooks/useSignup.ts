import { useContext, useState } from "react";
import zod from "zod"
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

interface FormData {
    [key : string] : string
  }

const userSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(6),
    email: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    gender : zod.string()
  });

const useSignup = () => {
    const [loading, setIsLoading] = useState(false);

    const { setAuthUser } = useContext(AuthContext)

    const signup = async (formData : FormData) => {

        const { success } = userSchema.safeParse(formData);
        if(!success) {
            return toast.error("Invalid Form Details");            
        }

        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/auth/signup", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(formData)
            });

            const data = await response.json();
            if(response.status !== 200){
                return toast.error(data.message);
            }

            localStorage.setItem("chat-user", JSON.stringify(data.credentials));
            setAuthUser(data.credentials);
            return toast.success(data.message);

        } catch (error) {
            toast.error("Internal Server Error")       
        } finally{
            setIsLoading(false);
        }
    }

    return { loading, signup }
}

export default useSignup;
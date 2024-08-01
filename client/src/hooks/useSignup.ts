import { useContext, useState } from "react";
import zod from "zod"
import toast from "react-hot-toast";
import { AuthContext, AuthContextType } from "../context/AuthContext";

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

    const { setAuthUser } = useContext<AuthContextType | null>(AuthContext)!

    const signup = async (formData : FormData) => {

        
        const passwordLength = formData.password.length
        if(passwordLength < 6){
            return toast.error("Passwords should be atleast 6 characters long")
        }

        const { success } = userSchema.safeParse(formData);
        if(!success) {
            return toast.error("Invalid Form Details");            
        }

        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/signup", {
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
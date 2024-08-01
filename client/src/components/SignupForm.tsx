import { FormEvent, useState } from "react";
import InputField from "./ui/InputField";
import Dropdown from "./ui/Dropdown";
import useSignup from "../hooks/useSignup";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface FormData {
  [key : string] : string
}

type Event = FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>

const SignupForm = () : React.JSX.Element => {

  const [formData, setFormData] = useState<FormData>({firstname : '', lastname : '', username : '', email : '', password : '', gender : ''});
  const { loading , signup } = useSignup()

  const handleSubmit = async (evt : Event) => {
    evt.preventDefault()
    await signup(formData);    
  }

  return(
    <form className="w-full font-0 text-[#353535] flex flex-col gap-12" action="/">
      <div className="w-full flex flex-col gap-6">
      <section className="w-full flex gap-2">
        <InputField labelName="First Name" fieldName="firstname" formData={formData} placeholderText="enter..." fieldType="text" setFormData={setFormData} />
        <InputField labelName="Last Name" fieldName="lastname" formData={formData} placeholderText="enter..." fieldType="text" setFormData={setFormData} />
      </section>

      <section className="w-full flex gap-2">
        <InputField labelName="Username" fieldName="username" formData={formData} placeholderText="enter..." fieldType="text" setFormData={setFormData} />
        <InputField labelName="Password" fieldName="password" formData={formData} placeholderText="enter..." fieldType="password" setFormData={setFormData} />  
      </section>

      <section className="w-full flex gap-2">
        <InputField labelName="Email" fieldName="email" formData={formData} placeholderText="example@xyz.com" fieldType="text" setFormData={setFormData} />
        <Dropdown labelName="Gender" fieldName="gender" formData={formData} setFormData={setFormData} />
      </section>
      </div>

      <section className="w-full flex gap-2">
        <button className="w-[50%] border border-[#353535] font-medium py-2 rounded-md shadow-sm cursor-pointer"><Link to="/">Cancel</Link></button>  
        <button onClick={(evt) => handleSubmit(evt)} className="w-[50%] flex items-center justify-center bg-[#353535] text-white font-medium py-2 rounded-md shadow-sm">{loading ? <Loader2 className="animate-spin" /> : "Confirm"}</button>
      </section>
      
    </form>
  )
} 

export default SignupForm; 
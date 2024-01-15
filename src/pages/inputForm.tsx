import InputField from "@/components/input/inputField"
import { useState } from "react"
import {FormEvent} from "react"

const InputForm = () => {
  const [stAddress,setStAddress] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(Object.fromEntries(data.entries()));
  
  }
  return (
    <div className="absolute top-0 left-24 w-1/2 bg-medium h-full border border-black ">
      <form onSubmit={handleSubmit}>
        <InputField name="stAddress" placeholder="Street Address"  />
        <InputField name="country" placeholder="Street Address"  />
        <button>Submit</button>
     </form>
    </div>
    
  )
}

export default InputForm

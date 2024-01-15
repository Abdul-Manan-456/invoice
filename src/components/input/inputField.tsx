import React, { InputHTMLAttributes } from 'react';
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;

}
const InputField: React.FC<InputFieldProps> = (props) => {

  return (
    <div>
      <label htmlFor="streetAddress" >Street Address</label>
      <input id="streetAddress" name={props.name} placeholder={props.placeholder} />
    </div>
  )
}

export default InputField

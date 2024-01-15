import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";

interface formProps {
  label?: string;
  name: string;
  type?: any;
  placeholder?: string;
  as?: string;
  value?: any;
}
const FormikInput: React.FC<formProps> = ({
  label,
  name,
  type,
  placeholder,
}) => {
  const { errors, touched } = useFormikContext();
  const hasError =
    (touched as Record<string, string>)[name] &&
    (errors as Record<string, string>)[name];
  const dynamicClass = hasError ? "border-rose-600" : "border-slate-400";
  return (
    <div className="flex flex-col md:text-base text-sm ">
      <label htmlFor="email" className=" text-stone-600  dark:text-white">
        {label}
      </label>
      <Field
        name={name}
        type={type ? type : "text"}
        placeholder={placeholder}
        className={`h-8 border border-slate-400 p-px ${dynamicClass} rounded-sm px-1 focus:outline-none text-black dark:text-white dark:bg-dark bg-white`}
      />
      <div className="text-rose-600  text-xs">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default FormikInput;

import { Formik } from "formik";
import React, { useState } from "react";
import FormikInput from "./formikInput";
interface paymentTermProps {
  handlePaymentTemrs: (arg0: string) => void;
}
const PaymentTerms: React.FC<paymentTermProps> = ({ handlePaymentTemrs }) => {
  const [selectValue, setSelectValue] = useState("");

  const payValues = ["Net 1 Day", "Net 7 Day", "Net 14 Day", "Net 30 Day"];
  return (
    <div className="relative bottom-4 right-0 w-full h-36 text-black flex flex-col justify-between  shadow-xl border broder-slate-500 rounded-md p-4 px-12">
      {payValues.map((value, index) => (
        <p
          key={index}
          className="hover:text-blue-500 hover:cursor-pointer "
          onClick={() => handlePaymentTemrs(value)}
        >
          {value}
        </p>
      ))}
    </div>
  );
};

export default PaymentTerms;

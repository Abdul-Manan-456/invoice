import React, { useState } from "react";

interface subDropDownProps {
  value: string;
  isActive: any;
  handleInvoiceStatus: (arg0: string) => void;
}
const SubDropDown: React.FC<subDropDownProps> = ({
  value,
  handleInvoiceStatus,
  isActive,
}) => {
  return (
    <div className={`flex items-centerjustify-start m-2 font-medium`}>
      <input
        onClick={() => handleInvoiceStatus(value)}
        id={value}
        className={`${
          isActive ? "bg-blue-500 text-white" : "bg-primary"
        }  w-5 h-5 border border-none cursor-pointer rounded-sm mr-4`}
        type="checkbox"
        checked={isActive}
      />
      <label htmlFor={value} className="capitalize cursor-pointer">
        {value}
      </label>
    </div>
  );
};

export default SubDropDown;

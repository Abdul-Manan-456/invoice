import React, { useState, useEffect } from "react";
import SubDropDown from "./items/subDropDown";
import useInvoicesStore from "@/store/invoiceStore";
interface dropDownListProps {
  handleInvoiceStatus: (arg0: string) => void;
}
const DropDownList: React.FC<dropDownListProps> = ({ handleInvoiceStatus }) => {
  type activeItemState = Record<string, boolean>;
  const statusValues = ["All", "pending", "paid", "draft"];
  const [activeItem, setActiveItem] = useState<activeItemState>({
    All: false,
    pending: false,
    draft: false,
    paid: false,
  });

  const handleDrropDownClick = (value: string) => {
    handleInvoiceStatus(value);
    setActiveItem((prevValues) => ({
      // ...prevValues,
      [value]: !prevValues[value],
    }));
  };

  return (
    <div className="shadow-2xl absolute md:right-80 md:top-28 sm:right-60 sm:top-36 right-48 top-36 w-48 h-44 bg-white dark:bg-medium rounded-md flex flex-col justify-center">
      {statusValues.map((value, index) => (
        <SubDropDown
          handleInvoiceStatus={handleDrropDownClick}
          value={value}
          key={index}
          isActive={activeItem[value]}
        />
      ))}
    </div>
  );
};

export default DropDownList;

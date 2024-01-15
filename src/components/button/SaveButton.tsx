import { FormikErrors } from "formik";
import React, { MouseEventHandler } from "react";
interface buttonProps {
  handleInvoiceVisible?: () => void;
  type?: any;
  variant?: "draft" | "send" | "paid" | "saveAs";
  disabled?: boolean;
  text?: string;
  setFieldValue: (field: string, value: string) => void;
}

const SaveButton: React.FC<buttonProps> = ({
  type,
  text,
  variant,
  disabled,
  setFieldValue,
}) => {
  const buttonClassName = `text-white md:w-32 md:h-12 w-24 h-12 text-xs cursor-pointer flex items-center justify-center rounded-full md:font-medium  font-light text-sm ${
    variant === "draft"
      ? "mr-2 bg-slate-700 hover:bg-slate-900"
      : variant === "send"
      ? "bg-sky-600 hover:bg-sky-700"
      : variant === "saveAs"
      ? "bg-[#7c5dfa] hover:bg-[#9277FF]"
      : ""
  } ${
    disabled && variant === "send"
      ? "bg-slate-400 hover:bg-slate-400 curosor-none"
      : ""
  } `;

  const statusForm = (value: string) => {
    setFieldValue("status", value);
  };
  return (
    <div>
      <button
        onClick={
          variant === "draft"
            ? () => statusForm("draft")
            : () => statusForm("pending")
        }
        type={type}
        className={buttonClassName}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default SaveButton;

import React from "react";

interface editButtonProps {
  handleInvoiceVisible: () => void;
  setData: ({}) => void;
}
const EditButton: React.FC<editButtonProps> = ({ handleInvoiceVisible }) => {
  return (
    <div
      onClick={handleInvoiceVisible}
      className="w-20 cursor-pointer h-12 rounded-full text-slate-500 bg-gray-300 hover:bg-gray-400 flex items-center justify-center curosr-pointer"
    >
      <p>Edit</p>
    </div>
  );
};

export default EditButton;

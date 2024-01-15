import React from "react";

interface discardButtonProps {
  handleInvoiceVisible: () => void;
}
const DiscardButton: React.FC<discardButtonProps> = ({
  handleInvoiceVisible,
}) => {
  return (
    <div
      onClick={handleInvoiceVisible}
      className="py-4 px-6 text-xs rounded-full font-bold  bg-slate-50 text-stone-400 flex items-center justify-center cursor-pointer"
    >
      <p>Discard</p>
    </div>
  );
};

export default DiscardButton;

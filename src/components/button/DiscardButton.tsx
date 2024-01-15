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
      className="md:w-24 md:h-12 w-16 h-8 rounded-full font-bold md:text-base text-sm bg-slate-50 text-stone-400 flex items-center justify-center cursor-pointer"
    >
      <p>Discard</p>
    </div>
  );
};

export default DiscardButton;

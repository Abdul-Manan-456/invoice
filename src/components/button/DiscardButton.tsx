import React from "react";


interface discardButtonProps {
    handleInvoiceVisible: () => void;
}
const DiscardButton: React.FC<discardButtonProps> = ({ handleInvoiceVisible }) => {
    return (
        <div onClick={handleInvoiceVisible} className="w-24 h-12 rounded-full bg-slate-50 text-stone-400 flex items-center justify-center cursor-pointer">
            <strong>Discard</strong>
        </div>
    )
}

export default DiscardButton

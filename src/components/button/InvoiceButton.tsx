import Image from "next/image"
import React from "react";
interface buttonProps {
    status?: string;
}
const InvoiceButton: React.FC<buttonProps> = ({ status }) => {

    const cssCircle = `${status === 'pending' ? 'bg-orange-600 ' : status === 'draft' ? 'bg-black' : 'bg-green-900'}`
    const cssDiv = `${status === 'pending' ? 'bg-orange-100 dark:bg-[#2B2736]' : status === 'draft' ? 'bg-slate-100 text-black dark:bg-[#292C45]' : 'bg-green-100 dark:bg-[#1F2C3F] text-green-500'}`
    const cssStatus = `${status === 'pending' ? 'text-orange-600' : status === 'draft' ? 'text-black' : 'text-green-900'}`

    return (
        <div className={`flex cursor-pointer justify-between w-24 items-center p-3 ${cssDiv} rounded-md`}>
            <div className="flex items-center justify-center">
                <p className={`w-2 h-2 mr-2 rounded-full  ${cssCircle}`}></p>
                <p className={`text-sm capitalize ${cssStatus}`}>{status}</p>
            </div>


        </div>
    )
}

export default InvoiceButton

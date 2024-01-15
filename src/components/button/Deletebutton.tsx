import useInvoicesStore from "@/store/invoiceStore";
import Link from "next/link";
import React from "react";

interface deleteButtonProps {
  invoiceId: string;
}
const Deletebutton: React.FC<deleteButtonProps> = ({ invoiceId }) => {
  const { deleteInvoice } = useInvoicesStore();

  // const invoices = global.window.localStorage.getItem("invoices");
  // const parcedInvoices = invoices ? JSON.parse(invoices) : [];
  // console.log("Invoices from delete button", parcedInvoices);
  return (
    <Link href="/">
      <div
        onClick={() => deleteInvoice(invoiceId)}
        className="w-24 h-12 cursor-pointer rounded-full bg-rose-600 hover:bg-[#FF9797]  text-white flex items-center mx-4 justify-center curosr-pointer"
      >
        <p>Delete</p>
      </div>
    </Link>
  );
};

export default Deletebutton;

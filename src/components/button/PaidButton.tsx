import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
interface paidButtonProps {
  dataStatus: {
    id: string;
    status: string;
  };
}
const PaidButton: React.FC<paidButtonProps> = ({ dataStatus }) => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const statusId = dataStatus?.id;
  //---- TAKING THE INVOICES FROM LOCAL STORAGE -----------------------
  const fetchDataFromLocalStorage = useCallback(() => {
    const storageInvoices = localStorage.getItem("invoices");
    const parseInvoices = storageInvoices ? JSON.parse(storageInvoices) : [];
    const singleInvoice = parseInvoices.find(
      (invoice: { id: string }) => invoice.id === statusId
    );
    setData(singleInvoice);
  }, [statusId]);

  useEffect(() => {
    fetchDataFromLocalStorage();
  }, [statusId, fetchDataFromLocalStorage]);

  //-------- HANDLING THE PAID INVOICES--------
  const handlePaidInvoice = async () => {
    setData((prevData: any) => ({
      ...prevData,
      status: "paid",
    }));
    const storageInvoices = localStorage.getItem("invoices");
    const parseInvoices = storageInvoices ? JSON.parse(storageInvoices) : [];
    const updatedInvoices = parseInvoices.map((invoice: any) =>
      invoice.id === statusId ? { ...invoice, status: "paid" } : invoice
    );
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    router.push("/");
  };
  const alreadyPaid = `${
    data?.status === "paid"
      ? "bg-slate-500 hover:bg-slate-500 cursor-default"
      : "bg-sky-600 hover:bg-sky-700 text-stone-300 "
  } `;

  return (
    <div
      onClick={handlePaidInvoice}
      className={`w-40 h-12 cursor-pointer ${alreadyPaid} flex items-center justify-center font-bold rounded-full  `}
    >
      <p>Mark As Paid</p>
    </div>
  );
};

export default PaidButton;

// parseInvoices.map((invoice: { id: string }) => {
//   return invoice.id === statusId ? { ...invoice, status: "paid" } : invoice;
// })

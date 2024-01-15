"use client";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import InvoiceHeader from "@/components/invoiceHeader";
import Invoice from "@/components/invoices";
import { useEffect, useState } from "react";
import Formik from "./formik";
import useInvoicesStore from "@/store/invoiceStore";
import { Invoice as InvoiceModel } from "@/models/invoiceModel";
import createRandomUser from "@/models/userFaker";
import { EmptyInvoices } from "@/components/items/EmptyInvoices";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { invoices, addInvoice } = useInvoicesStore();

  const [isInvoiceVisible, setIsInvoiceVisible] = useState(false);
  const handleInvoiceVisible = () => {
    setIsInvoiceVisible(!isInvoiceVisible);
  };

  //handing the filtered invoices
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceModel[]>([]);
  const [invoiceStatus, setInvoiceStatus] = useState("All");
  const handleInvoiceStatus = (status: string) => {
    setInvoiceStatus(status);
  };

  //------ HANDING THE INVOICES -----------------------------
  useEffect(() => {
    const storageInvoices = localStorage.getItem("invoices");
    const parseInvoices = storageInvoices ? JSON.parse(storageInvoices) : [];
    // console.log("parseInvoices", parseInvoices);
    if (invoiceStatus === "All") {
      setFilteredInvoices([...parseInvoices]);
    } else {
      setFilteredInvoices(
        parseInvoices.filter((invoice: any) => invoice.status === invoiceStatus)
      );
    }
  }, [invoices, invoiceStatus, addInvoice]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start md:p-16 p-0 ${inter.className} dark:bg-dark dark:text-white`}
    >
      <div className="w-5/6 md:mt-0 mt-28 dark:text-white ">
        <InvoiceHeader
          noOfInvoices={filteredInvoices.length}
          handleInvoiceStatus={handleInvoiceStatus}
          handleInvoiceVisible={handleInvoiceVisible}
        />

        {isInvoiceVisible && (
          <Formik handleInvoiceVisible={handleInvoiceVisible} />
        )}
        {filteredInvoices.length > 0 ? (
          <Invoice filteredInvoices={filteredInvoices} />
        ) : (
          <EmptyInvoices />
        )}
      </div>

      <Navbar />
    </main>
  );
}

"use client";
import Image from "next/image";
import InvoiceButton from "./button/InvoiceButton";
import React, { useState } from "react";
import { Invoice as InvoiceModel } from "@/models/invoiceModel";
import Link from "next/link";
import { useRouter } from "next/router";

interface invoiceProps {
  filteredInvoices: InvoiceModel[];
}
const Invoice: React.FC<invoiceProps> = ({ filteredInvoices }) => {
  const router = useRouter();

  //-------- NAVIGATION TO DETAILD INVOICES ----------------
  const handleSingleInvoice = (id: string) => {
    router.push(`/invoice_detail/${id}`);
  };

  const reversedInvoice = filteredInvoices.slice().reverse();

  return (
    <>
      {reversedInvoice.map((invoice, index) => {
        const grandTotal =
          invoice.items &&
          invoice?.items.reduce((total, item) => {
            const quantity = item.quantity !== undefined ? item.quantity : 0;
            const price = item.price !== undefined ? item.price : 0;
            return total + quantity * price;
          }, 0);
        return (
          <main
            onClick={(e) => {
              handleSingleInvoice(invoice.id);
            }}
            key={invoice.id}
            className="lg:text-bold  bg-white rounded-lg lg:text-base text-xs  sm:p-4 p-3 md:my-5 my-3 flex justify-between w-full h-24 hover:cursor-pointer border border-transparent box-border hover:border hover:border-blue-500 dark:bg-medium"
          >
            <div className="flex md:flex-row flex-col justify-start md:items-center items-start w-3/5">
              <p className="md:mr-12 mr-8 mb-0.5">
                <span className=" text-stone-500">#</span>
                {invoice.invoiceNo}
              </p>
              <p className="text-stone-500 font-medium  w-[150px]">
                {invoice.clientCity}
              </p>
              <p className="text-stone-500 font-medium w-[150px]  ">
                {invoice.clientName}
              </p>
            </div>
            <div className="flex md:flex-row flex-col justify-between text-base md:items-center items-start md:w-2/5 w-[120px] ">
              <p className="mb-0.5">
                <span>Rs. </span>
                {grandTotal || 0.0}
              </p>

              <div className="flex item-center justify-start">
                <InvoiceButton status={invoice.status} />
                <Image
                  src="/icons/right_expand_arrow.svg"
                  alt="right_expand_arrow"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </main>
        );
      })}
    </>
  );
};

export default Invoice;

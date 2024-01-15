import Deletebutton from "@/components/button/Deletebutton";
import EditButton from "@/components/button/EditButton";
import InvoiceButton from "@/components/button/InvoiceButton";
import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useInvoicesStore from "@/store/invoiceStore";
import Formik from "@/pages/formik";
import PaidButton from "@/components/button/PaidButton";

interface singleInvoiceProps {
  invoiceId?: null | string;
  getInvoiceById: any;
  text?: string;
}
const SingleInvoicePage: React.FC<singleInvoiceProps> = ({}) => {
  const [data, setData] = useState<any>(null);
  // ----- GETTING ID AND THEN VALUE FROM STORE -----
  const { editInvoice, isInvoiceUpdated, setIsInvoiceUpdated } =
    useInvoicesStore();
  const router = useRouter();
  const { id } = router.query;
  const invoiceId = id ? id[0] : "undefined";
  //---- TAKING THE INVOICES FROM LOCAL STORAGE -----------------------
  useEffect(() => {
    const storageInvoices = localStorage.getItem("invoices");
    const parseInvoices = storageInvoices ? JSON.parse(storageInvoices) : [];

    if (isInvoiceUpdated) {
      setIsInvoiceUpdated(false);
    }
    const data = parseInvoices.find(
      (invoice: { id: string }) => invoice.id === invoiceId
    );
    setData(data);
  }, [invoiceId, setIsInvoiceUpdated, isInvoiceUpdated]);

  // const data = invoiceStore.getInvoiceById(invoiceId);
  //----- HANDLE INVOICE VISIBILITY ----------
  const [isInvoiceVisible, setIsInvoiceVisible] = useState(false);

  const handleInvoiceVisible = () => {
    setIsInvoiceVisible(!isInvoiceVisible);
  };

  // GRAND TOTAL
  const grandTotal =
    data?.items &&
    data.items.reduce((itemTotal: number, product: any) => {
      const quantity = product.quantity !== undefined ? product.quantity : 0;
      const price = product.price !== undefined ? product.price : 0;
      return itemTotal + quantity * price;
    }, 0);
  return (
    <main
      className={`flex  min-h-screen flex-col items-center justify-between p-24   dark:bg-dark dark:text-white`}
    >
      {/* <Formik /> */}
      {isInvoiceVisible && (
        <Formik data={data} handleInvoiceVisible={handleInvoiceVisible} />
      )}
      <Navbar />
      <div className="dark:text-white w-5/6">
        <div className="flex items-center justify-start text-slate-500 dark:text-white">
          <Link className="flex items-center" href="/">
            <Image
              className="cursor-pointer"
              src="/icons/arrow_back.svg"
              width={30}
              height={30}
              alt="back_arrow"
            />
            <h3 className="cursor-pointer">Go Back</h3>
          </Link>
        </div>
        <div className="flex items-center h-24 my-4 bg-white dark:bg-medium  p-4 rounded-lg shadow-md   justify-between">
          <div className="flex items-center justify-start ">
            <p className="mr-4 text-slate-500 dark:text-white">Status</p>
            <InvoiceButton status={(data && data.status) || ""} />
          </div>

          <div className="flex items-center justify-end">
            <EditButton
              setData={setData}
              handleInvoiceVisible={handleInvoiceVisible}
            />
            <Deletebutton invoiceId={invoiceId} />
            <PaidButton dataStatus={data} />
          </div>
        </div>
        <div className="flex items-center  my-4 bg-white dark:bg-medium  p-8 rounded-lg shadow-md justify-between">
          <div className="w-full">
            <div className="flex items-start justify-between  ">
              <div className="w-40">
                <p className="text-lg font-bold mb-1 dark:text-white">
                  {data?.invoiceNo}
                </p>
                <p className="text-sm  text-slate-500 dark:text-slate-200">
                  {data?.descriotion}
                </p>
              </div>
              <div className="text-sm  text-slate-500 dark:text-slate-200">
                <p>{data?.clientStAddress}</p>
                <p>{data?.clientCity}</p>
                <p>{data?.clientPostCode}</p>
              </div>
            </div>
            <div className="flex items-start justify-start my-8">
              <div>
                <div className="mb-4 mr-36">
                  <p className="text-sm  text-slate-500 dark:text-slate-200">
                    invoice Date
                  </p>
                  <p className="text-lg font-bold my-2 dark:text-white">
                    {data?.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm  text-slate-500 dark:text-slate-200">
                    Payment due
                  </p>
                  <p className="text-lg font-bold my-2 dark:text-white">
                    2023-04-01
                  </p>
                </div>
              </div>
              {/* Bill To details */}
              <div className=" w-44 mr-36 ">
                <p className="text-sm  text-slate-500 dark:text-slate-200">
                  Bill to
                </p>
                <p className="text-lg font-bold my-2 dark:text-white">
                  {data?.clientName}
                </p>
                <p className="text-sm  text-slate-500 dark:text-slate-200">
                  {data?.clientName}
                  {/* <span>,</span> */}
                </p>
                <p className="text-sm  text-slate-500 dark:text-slate-200">
                  {data?.clientCity}
                </p>
                <p className="text-sm  text-slate-500 dark:text-slate-200">
                  {data?.clientCountry || ""}
                </p>
              </div>
              {/* Sent to */}
              <div>
                <p className="text-sm  text-slate-500 dark:text-slate-200">
                  Sent to
                </p>
                <p className="text-lg font-bold my-2 dark:text-white">
                  {data?.clientEmail || ""}
                </p>
              </div>
            </div>

            {/* -------- ITEM LIST DETAILS ------------------- */}
            <div className="p-4 px-12 bg-[#F9FAFE] rounded-t-lg dark:bg-[#252945]">
              {data?.items && (
                <table className="w-full">
                  <thead className="text-left ">
                    <tr className="text-sm font-bold dark:text-white">
                      <th className="">Item Name</th>
                      <th className="text-center">Qty.</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Total</th>
                    </tr>
                  </thead>
                  <div></div>
                  <tbody>
                    {data.items.map((item: any, index: number) => (
                      <tr key={index} className="text-sm text-center">
                        <td className="text-left">{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td className="text-center">
                          {item.quantity * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="flex items-center justify-between text-white px-8 bg-[#373B53] p-6 rounded-b-lg dark:bg-[#0C0E16]">
              <div className="text-sm">Amount Due</div>

              <div className="text-3xl text-bold">
                <p>
                  <span>Rs. </span>
                  {grandTotal || 0.0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleInvoicePage;
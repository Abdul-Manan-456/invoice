import { create } from "zustand";
import invoiceSchema, { Invoice } from "@/models/invoiceModel";
import { v4 as uuidv4 } from "uuid";
import { json } from "stream/consumers";

interface InvoiceStore {
  invoices: Invoice[];
  addDummyData: () => void;
  isInvoiceUpdated: boolean;
  setInvoiceId: (arg0: string | null) => void;
  getInvoiceById: (arg0: string | null) => Invoice | undefined;
  addInvoice: (newInvoice: Invoice) => void;
  invoiceNo: string | null;
}

// generating the invoice number
function generateInvoiceNumber(length = 6) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let invoiceNumber = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    invoiceNumber += characters.charAt(randomIndex);
  }

  return invoiceNumber;
}

const useInvoicesStore: any = create<InvoiceStore>((set) => ({
  invoiceNo: null,
  invoices: [
    // {
    //   id: "1",
    //   status: "pending",
    //   invoiceNo: "RT3080",
    //   stAddressFrom: "House no 13, mansoor abad, faisalabad",
    //   cityFrom: "faisalabad",
    //   clientCity: "faisalabad",
    //   clientName: "Abdul Manan",
    //   clientStAddress: "Lahore",
    //   items: [
    //     {
    //       itemName: "Shoes",
    //       quantity: 3,
    //       price: 50,
    //     },
    //     {
    //       itemName: "Car",
    //       quantity: 5,
    //       price: 540,
    //     },
    //   ],
    // },
    // {
    //   id: "2",
    //   status: "paid",
    //   invoiceNo: "ST6770",
    //   stAddressFrom: "House no 13, mansoor abad, faisalabad",
    //   cityFrom: "faisalabad",
    //   clientCity: "Karachi",
    //   clientName: "Anish",
    //   clientStAddress: "Lahore",
    //   items: [
    //     {
    //       itemName: "Bottle",
    //       quantity: 3,
    //       price: 870,
    //     },
    //     {
    //       itemName: "Petrol",
    //       quantity: 65,
    //       price: 50,
    //     },
    //   ],
    // },
    // {
    //   id: "65",
    //   status: "draft",
    //   invoiceNo: "GJ8490",
    //   stAddressFrom: "House no 13, mansoor abad, faisalabad",
    //   cityFrom: "faisalabad",
    //   clientCity: "Rawappindi",
    //   clientName: "Muhammd Salah",
    //   clientStAddress: "Rawappindi",
    //   items: [
    //     {
    //       itemName: "Shoes",
    //       quantity: 3,
    //       price: 6540,
    //     },
    //     {
    //       itemName: "Book",
    //       quantity: 7,
    //       price: 540,
    //     },
    //   ],
    // },
    // {
    //   id: "69",
    //   status: "pending",
    //   invoiceNo: "HL8365",
    //   stAddressFrom: "House no 13, mansoor abad, faisalabad",
    //   cityFrom: "faisalabad",
    //   clientCity: "Layyah",
    //   clientName: "Imran",
    //   clientStAddress: "KOITA",
    //   items: [
    //     {
    //       itemName: "Shoes",
    //       quantity: 3,
    //       price: 870,
    //     },
    //     {
    //       itemName: "Laptop",
    //       quantity: 4,
    //       price: 654,
    //     },
    //   ],
    // },
    // {
    //   id: "4",
    //   status: "paid",
    //   invoiceNo: "RT3080",
    //   stAddressFrom: "House no 13, mansoor abad, faisalabad",
    //   cityFrom: "faisalabad",
    //   clientCity: "Monal",
    //   clientName: "NOMAN ALI",
    //   clientStAddress: "Lahore",
    //   items: [
    //     {
    //       itemName: "Shoes",
    //       quantity: 52,
    //       price: 450,
    //     },
    //     {
    //       itemName: "Shoes",
    //       quantity: 3,
    //       price: 50,
    //     },
    //     {
    //       itemName: "Shoes",
    //       quantity: 54,
    //       price: 5430,
    //     },
    //   ],
    // },
    // {
    //   id: "76",
    //   status: "draft",
    //   invoiceNo: "GY8944",
    //   stAddressFrom: "House no 13, mansoor abad, faisalabad",
    //   cityFrom: "faisalabad",
    //   clientName: "Sadaqat Ali",
    //   clientStAddress: "Pashawar",
    //   items: [
    //     {
    //       itemName: "Shoes",
    //       quantity: 3,
    //       price: 60,
    //     },
    //     {
    //       itemName: "Cup",
    //       quantity: 533,
    //       price: 50,
    //     },
    //   ],
    // },
  ],

  setInvoiceId: (id: string | null) =>
    set((state) => ({ ...state, invoiceId: id })),

  addInvoice: (newInvoice) => {
    try {
      const uuid = uuidv4();
      const randomInvoice = generateInvoiceNumber();
      // invoiceSchema.validateSync(newInvoice, { abortEarly: false });
      set((state) => {
        const updatedInvoices = [
          ...state.invoices,
          { ...newInvoice, id: uuid, invoiceNo: randomInvoice },
        ];
        localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
        return { invoices: updatedInvoices };
      });
    } catch (err) {
      console.log("validation error", err);
    }
  },

  getInvoiceById: (id: string | null) => {
    if (!id) return undefined;
    const storageInvoices = localStorage.getItem("invoices");
    const parseInvoices = storageInvoices ? JSON.parse(storageInvoices) : [];
    // const foundInvoice = useInvoicesStore
    //   .getState()
    //   .invoices.find((invoice: { id: string }) => invoice.id === id);
    const foundInvoice = parseInvoices.find(
      (invoice: { id: string }) => invoice.id === id
    );

    return foundInvoice;
  },

  addDummyData: () => {},
  editInvoice: async (id: string, updatedInvoice: Invoice) => {
    try {
      const invoices = localStorage.getItem("invoices");
      const parcedInvoices = invoices ? JSON.parse(invoices) : [];
      const updatedInvoices = parcedInvoices.map((invoice: any) =>
        invoice.id === id ? { ...invoice, ...updatedInvoice } : invoice
      );
      localStorage.removeItem("invoices");
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    } catch (err) {
      console.log("Validation error", err);
      throw err;
    }
  },
  isInvoiceUpdated: false,
  setIsInvoiceUpdated: (value: boolean) => {
    set({ isInvoiceUpdated: value });
  },
  deleteInvoice: (id: string) => {
    try {
      const invoices = localStorage.getItem("invoices");
      const parcedInvoices = invoices ? JSON.parse(invoices) : [];
      const filteredInvoices = parcedInvoices.filter(
        (invoice: any) => invoice.id !== id
      );
      localStorage.removeItem("invoices");
      localStorage.setItem("invoices", JSON.stringify(filteredInvoices));
    } catch (err) {
      console.log("Error deleting invoice", err);
    }
  },
}));

export default useInvoicesStore;

import { object, string, number, date, InferType, array } from "yup";

export interface Invoice {
  invoiceNo: string;
  id: string;
  stAddressFrom: string;
  cityFrom: string;
  postCodeFrom?: number;
  countryFrom?: string;
  clientName: string;
  clientEmail?: string;
  clientStAddress: string;
  clientCity?: string;
  clientPostCode?: string;
  clientCountry?: string;
  status: "pending" | "draft" | "paid";
  date?: Date;
  description?: string;
  paymentTerms?: "net1day" | "net7day" | "net15day" | "net30day";
  items?: Array<{
    itemName?: string;
    quantity?: number;
    price?: number;
    total?: number;
  }>;
}

const itemsSchema = object({
  itemName: string().required("Required"),
  quantity: number().typeError("Invalid Number"),
  price: number().typeError("Invalid Number"),
  total: number(),
});

const invoiceSchema = object({
  id: string(),
  invoiceNo: string(),
  stAddressFrom: string().required("Please enter address"),
  cityFrom: string().required("Please enter city"),
  postCodeFrom: number(),
  countryFrom: string(),
  clientName: string().required("Please enter name"),
  clientEmail: string().email("Must be a valid email"),
  clientStAddress: string(),
  clientCity: string(),
  clientPostCode: string(),
  clientCountry: string(),
  status: string().default(() => "pending"),
  date: date().default(() => new Date()),
  description: string().max(300, "max 300 characters are allowed"),
  paymentTerms: string().oneOf(["net1day", "net7day", "net15day", "net30day"]),
  items: array().of(itemsSchema).required("at least one item needs to be here"),
});

export default invoiceSchema;

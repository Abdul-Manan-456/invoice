import React, { use } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikInput from "@/components/input/formikInput";
import invoiceSchema, { Invoice } from "@/models/invoiceModel";
import SelectInput from "@/components/input/selectInput";
import { ListItems } from "@/components/input/listItems";
import DiscardButton from "@/components/button/DiscardButton";
import SaveButton from "@/components/button/SaveButton";
import useInvoicesStore from "@/store/invoiceStore";


interface formikDataProps {
  handleInvoiceVisible: () => void;
}
const FormikData: React.FC<formikDataProps> = ({ handleInvoiceVisible }) => {


  const { addInvoice } = useInvoicesStore();
  return (
    <main className="fixed top-0 left-24 w-1/2 bg-white h-full rounded-r-lg  overflow-y-scroll no-scrollbar shadow-lg
     dark:bg-medium ">
      <Formik
        initialValues={{
        }}
        validationSchema={invoiceSchema}
        onSubmit={(values, { setSubmitting }) => {
          // console.log(values)
          handleInvoiceVisible();
          addInvoice(values as Invoice);
          setSubmitting(false)
        }}>


        {({ values, setFieldValue, isSubmitting, isValid, dirty }) => (
          <Form>
            <div className="mx-8 my-16 text-blue-600">
              <h1 className="mb-4">Bill from</h1>
              <FormikInput
                name="stAddressFrom"
                type="string"
                label="Street Address"
              />
              <div className="grid grid-cols-3 gap-3 dark:text-white">
                <FormikInput name="cityFrom" type="string" label="City" />
                <FormikInput
                  name="postCodeFrom"
                  type="number"
                  label="Post Code"
                />
                <FormikInput name="countryFrom" type="string" label="Country" />
              </div>
            </div>

            {/* BILL TO */}
            <div className="mx-8 my-16 text-blue-600">
              <h1 className="mb-4">Bill To</h1>
              <FormikInput name="clientName" type="string" label="Client Name" />
              <FormikInput
                name="clientEmail"
                type="string"
                label="Client Email"
              />
              <FormikInput
                name="clientStAddress"
                type="string"
                label="Street Address"
              />
              <div className="grid grid-cols-3 gap-3 ">
                <FormikInput name="clientCity" type="string" label="City" />
                <FormikInput
                  name="clientPostCode"
                  type="number"
                  label="Post Code"
                />
                <FormikInput name="clientCountry" type="string" label="Country" />
              </div>

              <FormikInput name="date" type="date" label="Invoice Date" />
              <SelectInput />

              <FormikInput
                name="descriotion"
                type="string"
                label="Project Description"
              />
              <ListItems values={values} />
              <div className="flex w-full items-center justify-between my-8">
                <DiscardButton handleInvoiceVisible={handleInvoiceVisible} />
                <div className="flex items-center justify-between w-1/2">
                  <SaveButton setFieldValue={setFieldValue} handleInvoiceVisible={handleInvoiceVisible} variant="draft" type="submit" text={"Save as Draft"} />
                  <SaveButton setFieldValue={setFieldValue} handleInvoiceVisible={handleInvoiceVisible} variant="send" type="submit" disabled={!(isValid && dirty)} text={"Save & Send"} />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default FormikData;

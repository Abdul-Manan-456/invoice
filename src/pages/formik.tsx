import React, { use, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormikInput from "@/components/input/formikInput";
import invoiceSchema, { Invoice } from "@/models/invoiceModel";
import SelectInput from "@/components/input/selectInput";
import { ListItems } from "@/components/input/listItems";
import DiscardButton from "@/components/button/DiscardButton";
import SaveButton from "@/components/button/SaveButton";
import useInvoicesStore from "@/store/invoiceStore";
import createRandomUser from "@/models/userFaker";
import { faker } from "@faker-js/faker";

interface formikDataProps {
  handleInvoiceVisible: () => void;
  data?: any;
}
const FormikData: React.FC<formikDataProps> = ({
  handleInvoiceVisible,
  data,
}) => {
  const { addInvoice, editInvoice, setIsInvoiceUpdated } = useInvoicesStore();
  return (
    <main
      className="fixed mb-40 pb-40  md:pb-8 space-y-4 md:top-0 top-20 md:left-24  left-0 md:w-1/2 sm:w-3/4 w-full bg-white h-full rounded-r-lg  overflow-y-scroll no-scrollbar shadow-lg
     dark:bg-medium "
    >
      <Formik
        initialValues={data || createRandomUser()}
        validationSchema={invoiceSchema}
        onSubmit={(values, { setSubmitting }) => {
          data
            ? editInvoice(data.id, values) && setIsInvoiceUpdated(true)
            : addInvoice(values as Invoice);
          handleInvoiceVisible();
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isValid, dirty }) => (
          <Form>
            <div className="mx-12 space-y-4 md:my-16 my-8 text-blue-600">
              <h1 className="md:mb-4 font-medium text-xl mb-2">Bill from</h1>
              <FormikInput
                name="stAddressFrom"
                type="string"
                label="Street Address"
                placeholder={faker.location.streetAddress()}
              />
              <div className="grid grid-cols-3 gap-3 dark:text-white">
                <FormikInput
                  name="cityFrom"
                  type="string"
                  placeholder={faker.location.city()}
                  label="City"
                />
                <FormikInput
                  name="postCodeFrom"
                  type="number"
                  label="Post Code"
                />
                <FormikInput
                  name="countryFrom"
                  type="string"
                  placeholder={faker.location.country()}
                  label="Country"
                />
              </div>
            </div>

            {/* BILL TO */}
            <div className="mx-12 md:space-y-4 space-y-2  text-blue-600">
              <h1 className="md:mb-4 mb-2 font-medium text-xl">Bill To</h1>
              <FormikInput
                name="clientName"
                type="string"
                label="Client Name"
                placeholder={faker.person.fullName()}
              />
              <FormikInput
                name="clientEmail"
                type="string"
                label="Client Email"
                placeholder={faker.internet.email()}
              />
              <FormikInput
                name="clientStAddress"
                type="string"
                label="Street Address"
                placeholder={faker.location.streetAddress()}
              />
              <div className="grid grid-cols-3 gap-3 ">
                <FormikInput
                  name="clientCity"
                  type="string"
                  placeholder={faker.location.city()}
                  label="City"
                />
                <FormikInput
                  name="clientPostCode"
                  type="number"
                  label="Post Code"
                />
                <FormikInput
                  name="clientCountry"
                  type="string"
                  label="Country"
                  placeholder={faker.location.country()}
                />
              </div>

              <FormikInput name="date" type="date" label="Invoice Date" />
              <SelectInput />

              <FormikInput
                name="descriotion"
                type="string"
                label="Project Description"
                placeholder={faker.lorem.words()}
              />
              <ListItems values={values} />
              <div className="flex w-full text-sm items-center justify-between md:my-8 my-4">
                {!data ? (
                  <DiscardButton handleInvoiceVisible={handleInvoiceVisible} />
                ) : (
                  <div></div>
                )}
                <div className="flex  mx-12 items-center justify-between md:w-5/12 w-1/2">
                  {!data ? (
                    <SaveButton
                      setFieldValue={setFieldValue}
                      handleInvoiceVisible={handleInvoiceVisible}
                      variant="draft"
                      type="submit"
                      text={"Save as Draft"}
                    />
                  ) : (
                    <div></div>
                  )}

                  <SaveButton
                    setFieldValue={setFieldValue}
                    handleInvoiceVisible={handleInvoiceVisible}
                    variant={data ? "saveAs" : "send"}
                    type="submit"
                    disabled={!isValid && dirty}
                    text={data ? "Save as" : "Save & Send"}
                  />
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

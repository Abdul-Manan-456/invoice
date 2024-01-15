import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import FormikInput from "./formikInput";
import Image from "next/image";
import AddItemButton from "../button/AddItemButton";
interface listItemsProps {
  values: {
    items?: Array<{
      itemName?: string;
      quantity?: number;
      price?: number;
    }>;
  };
}

export const ListItems: React.FC<listItemsProps> = ({ values }) => {
  return (
    <div>
      <FieldArray
        name="items"
        render={(arrayHelpers) => (
          <div className="md:space-y-3 space-y-1">
            <h1 className="md:text-xl text-lg text-[#888eb0] font-bold md:mt-16 mt-16 dark:text-white">
              List Item
            </h1>
            <div className="flex justify-start text-[#888eb0] md:font-medium font-normal md:text-lg text-base dark:text-white">
              <h3 className="w-1/5 mr-6">Item Name</h3>
              <h3 className="w-1/5 mr-6">Qty.</h3>
              <h3 className="w-1/5 mr-6">Price</h3>
              <h3 className="w-1/5 mr-6">Total</h3>
            </div>
            {values.items &&
              values.items.map((item, index) => {
                const itemTotalPrice =
                  item.quantity && item.price
                    ? (item.quantity * item.price).toFixed(2)
                    : 0.0;
                return (
                  <div
                    className="flex justify-between items-start relative h-16 flex-wrap"
                    key={index}
                  >
                    <div className="w-3/12">
                      <FormikInput
                        name={`items.${index}.itemName`}
                        placeholder="item name"
                      />
                    </div>
                    <div className="w-2/12">
                      <FormikInput
                        name={`items.${index}.quantity`}
                        placeholder="0.0"
                      />
                    </div>
                    <div className="w-1/5">
                      <FormikInput
                        name={`items.${index}.price`}
                        placeholder="0.0"
                      />
                    </div>
                    <div className="h-12 p-4 mt-2 mr-6 border border-slate-300 rounded-md text-sm box-border font-bold  w-3/12 text-black bg-white dark:text-white dark:bg-dark ">
                      {itemTotalPrice}
                    </div>
                    <Image
                      alt="dust_bin"
                      className={`col-span-end absolute top-4 right-0  cursor-pointer mt-2 ${
                        index === 0 ? "invisible" : ""
                      }`}
                      src="/icons/dust_bin.svg"
                      width={20}
                      height={20}
                      onClick={() => arrayHelpers.remove(index)}
                    />
                  </div>
                );
              })}
            <AddItemButton arrayHelpers={arrayHelpers} />
          </div>
        )}
      />
    </div>
  );
};

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
            <h1 className="md:text-xl text-lg text-stone-700 font-bold md:my-4 my-2 dark:text-white">
              List Item
            </h1>
            <div className="flex justify-start text-stone-700 md:font-medium font-normal md:text-lg text-base mb-5 dark:text-white">
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
                    className="flex justify-between items-start h-12  flex-wrap"
                    key={index}
                  >
                    <div className="w-1/5">
                      <FormikInput
                        name={`items.${index}.itemName`}
                        placeholder="item name"
                      />
                    </div>
                    <div className="w-1/5">
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
                    <div className="h-8 border border-slate-400 p-px mb-4 w-1/5 rounded-sm px-1 text-black bg-white dark:text-white dark:bg-dark ">
                      {itemTotalPrice}
                    </div>
                    <Image
                      alt="dust_bin"
                      className={`col-span-end cursor-pointer mb-4 ${
                        index === 0 ? "invisible" : ""
                      }`}
                      src="/icons/dust_bin.svg"
                      width={30}
                      height={30}
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

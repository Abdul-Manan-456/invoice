import { Field } from "formik";
const SelectInput = () => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor="email"
        className="text-[#888eb0] text-sm dark:text-white mb-1.5"
      >
        Payment Terms
      </label>
      <Field
        as="select"
        name="paymentTerms"
        className="h-12 p-3 border border-slate-300 rounded-md text-sm box-border font-bold  mb-4  focus:outline-none text-black bg-white dark:bg-dark dark:text-white"
      >
        <option value="net1day">Net 1 Day</option>
        <option value="net7day">Net 7 Day</option>
        <option value="net15day">Net 15 Day</option>
        <option value="net30day">Net 30 Day</option>
      </Field>
    </div>
  );
};

export default SelectInput;

import { Field } from 'formik'
const SelectInput = () => {
  return (
    <div className='flex flex-col'>
      <label htmlFor="email" className=' text-stone-600 dark:text-white'>Payment Terms</label>
      <Field as='select' name="paymentTerms" className='h-8 border border-slate-400 p-px mb-4 rounded-sm px-1 focus:outline-none text-black bg-white dark:bg-dark dark:text-white' >
        <option value="net1day">Net 1 Day</option>
        <option value="net7day">Net 7 Day</option>
        <option value="net15day">Net 15 Day</option>
        <option value="net30day">Net 30 Day</option>
      </Field>
    </div>
  )
}

export default SelectInput

import React from "react";

interface AddItemButtonProps {
  // handleIsAddingItem: (value: boolean) => void;
  arrayHelpers?: any;
}
const AddItemButton: React.FC<AddItemButtonProps> = ({ arrayHelpers }) => {
  return (
    <div
      onClick={() => arrayHelpers.push("")}
      className="sm:h-12 flex items-center justify-center cursor-pointer bg-white hover:bg-blue-200 rounded-full "
    >
      <strong> + Add Item</strong>
    </div>
  );
};

export default AddItemButton;

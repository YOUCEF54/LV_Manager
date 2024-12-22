import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function DropDown({ dataset }) {
  const [isDropdown, setIsDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1);

  return (
    <div className="flex-col text-[14px] relative w-fit items-center justify-center">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsDropdown(!isDropdown)}
        className="p-2 outline-none py-1 flex justify-between font-normal items-center gap-2 border border-neutral-200 bg-neutral-50 text-neutral-600 w-fit min-w-[8rem] rounded-md"
      >
        {dataset[selectedOption - 1]?.name}
        <ChevronDownIcon
          className={`size-4 ease-in-out duration-150 ${
            isDropdown ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <ul
        className={`flex-col border rounded-md w-full shadow-md bg-white max-h-36 overflow-y-auto absolute divide-y-2 mt-2 items-center justify-center m-auto ${
          isDropdown ? "" : "hidden"
        }`}
      >
        {dataset?.map((item) => (
          <li
            key={item.id}
            className={`p-2 py-1 flex justify-between items-center duration-300 cursor-pointer ${
              selectedOption === item.id ? "bg-neutral-100" : "bg-white"
            }`}
            onClick={() => {
              setSelectedOption(item.id);
              setIsDropdown(false);
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

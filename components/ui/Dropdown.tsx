"use client";

import { useState, useRef, useEffect } from "react";

type OptionType = {
  complete: string;
  label: string;
  onClick: () => void;
};

type DropdownProps = {
  label: string;
  options: OptionType[];
  search: string;
};

function Dropdown({ label, options, search }: DropdownProps) {
  const original = label;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownLabel, setDropdownLabel] = useState(label);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setDropdownLabel(label);
  }, [label]);

  useEffect(() => {
    setDropdownLabel(original);
  }, [search, original]);

  return (
    <div
      className="h-12 text-lg text-black dark:text-white font-bold cursor-pointer flex-1 flex-col relative
      flex items-center justify-center bg-gray-300 dark:bg-gray-800 border-none rounded-lg"
      ref={dropdownRef}
    >
      <div className="w-full h-full flex items-center justify-center bg-transparent" onClick={() => setIsOpen(!isOpen)}>
        {dropdownLabel}
      </div>
      {isOpen && (
        <ul className="bg-gray-300 dark:bg-gray-800 w-full absolute top-15 z-100 rounded-lg list-none text-center p-2 flex flex-col gap-y-2 duration-300">
          {options.map((option, index) => (
            <li
              key={index}
              className="py-1.5 rounded hover:bg-gray-400 hover:dark:bg-gray-900 duration-150 ease-in"
              onClick={() => {
                option.onClick();
                setDropdownLabel(option.complete);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;

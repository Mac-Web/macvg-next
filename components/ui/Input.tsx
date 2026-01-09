"use client";

type InputProps = {
  value: string;
  placeholder: string;
  onchange: React.Dispatch<React.SetStateAction<string>>;
};

function Input({ value, placeholder, onchange }: InputProps) {
  return (
    <input
      type="text"
      className="bg-transparent outline-none border-none text-black dark:text-white text-[18px] pl-5 pr-2 py-2.5 flex-1"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onchange(e.target.value)}
    />
  );
}

export default Input;

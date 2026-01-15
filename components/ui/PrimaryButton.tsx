"use client";

type PrimaryButtonProps = {
  text: string;
  click: () => void;
};

function PrimaryButton({ text, click }: PrimaryButtonProps) {
  return (
    <button
      className="bg-primary hover:bg-primary-hover duration-300 font-bold w-fit cursor-pointer rounded text-white py-1.5 px-4 text-lg"
      onClick={() => click()}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;

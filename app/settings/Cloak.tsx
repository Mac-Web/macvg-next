"use client";

import { FormEvent, useState, useEffect } from "react";
import Input from "@/components/ui/Input";

function Cloak() {
  const [name, setName] = useState<string>("");
  const [icon, setIcon] = useState<string>("");

  useEffect(() => {
    const savedCloaker = localStorage.getItem("macvg-cloaker");
    if (typeof window !== "undefined" && savedCloaker) {
      setName(JSON.parse(savedCloaker).name);
      setIcon(JSON.parse(savedCloaker).icon);
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const cloaker = { name, icon };
    localStorage.setItem("macvg-cloaker", JSON.stringify(cloaker));
    window.dispatchEvent(new CustomEvent("cloaker-change", { detail: { cloaker } }));
  }

  function handleUncloak() {
    localStorage.removeItem("macvg-cloaker");
    window.location.reload();
  }

  return (
    <div className="flex flex-col items-center gap-y-7 w-full">
      <h2 className="text-black dark:text-white text-2xl font-bold">Tab Cloaker</h2>
      <p className="text-center w-[95%]">
        Disguise the tab title and icon.{" "}
        <span className="text-primary cursor-pointer hover:underline" onClick={handleUncloak}>
          Uncloak
        </span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="border-2 border-gray-700 flex rounded pr-3 items-center w-[95%] sm:w-[50%] md:w-130"
      >
        <Input value={name} placeholder="Enter tab name here" onchange={setName} />
        <button
          type="submit"
          className="bg-gray-200 dark:bg-gray-950 hover:bg-gray-300 hover:dark:bg-gray-900 duration-300 py-1.5 h-fit px-2
           rounded cursor-pointer font-bold"
        >
          Go
        </button>
      </form>
      <form
        onSubmit={handleSubmit}
        className="border-2 border-gray-700 flex rounded pr-3 items-center w-[95%] sm:w-[50%] md:w-130"
      >
        <Input value={icon} placeholder="Enter tab icon URL here" onchange={setIcon} />
        <button
          type="submit"
          className="bg-gray-200 dark:bg-gray-950 hover:bg-gray-300 hover:dark:bg-gray-900 duration-300 py-1.5 h-fit px-2
           rounded cursor-pointer font-bold"
        >
          Go
        </button>
      </form>
    </div>
  );
}

export default Cloak;

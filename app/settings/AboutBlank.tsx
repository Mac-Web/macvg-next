"use client";

import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";

function AboutBlank() {
  const [inputURL, setInputURL] = useState<string>("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handleEmbed();
  }

  function handleEmbed(url?: string) {
    let openURL = url || inputURL;
    if (!openURL.startsWith("https://") && !openURL.startsWith("http://")) {
      openURL = `https://${openURL.split("https://").pop()}`;
    } else if (openURL.startsWith("http://")) {
      openURL = `https://${openURL.split("http://").pop()}`;
    }
    const win = window.open()!;
    win.document.body.style.margin = "0";
    win.document.body.style.height = "100vh";
    const iframe = win.document.createElement("iframe");
    iframe.style.border = "none";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.margin = "0";
    iframe.referrerPolicy = "no-referrer";
    iframe.allow = "fullscreen";
    iframe.src = openURL;
    win.document.body.appendChild(iframe);
  }

  return (
    <div className="flex flex-col items-center gap-y-7 w-full">
      <h2 className="text-black dark:text-white text-2xl font-bold">About:blank Embedder</h2>
      <p className="text-center w-[95%]">
        Open a website in an about:blank page.{" "}
        <span className="text-primary cursor-pointer hover:underline" onClick={() => handleEmbed(window.location.href)}>
          Open MacVG in about:blank
        </span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="border-2 border-gray-700 flex rounded pr-3 items-center w-[95%] sm:w-[50%] md:w-130"
      >
        <Input value={inputURL} placeholder="Enter URL address here" onchange={setInputURL} />
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

export default AboutBlank;

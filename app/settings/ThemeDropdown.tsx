"use client";

import { useState } from "react";

function ThemeDropdown() {
  const [theme, setTheme] = useState<string>("orange");

  return (
    <select
      className="bg-gray-200 dark:bg-gray-950 border-2 border-gray-700 text-black dark:text-white rounded-lg text-lg cursor-pointer outline-none py-2 px-2.5 appearance-none w-25 text-center duration-300 hover:bg-gray-300 hover:dark:bg-gray-900"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="orange">Sun</option>
      <option value="blue">Ocean</option>
      <option value="green">Forest</option>
      <option value="red">Mars</option>
    </select>
  );
}

export default ThemeDropdown;

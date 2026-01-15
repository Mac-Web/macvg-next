"use client";

import { useState, useEffect } from "react";

const colors: Record<string, number[]> = {
  orange: [37, 94, 50],
  blue: [220, 95, 45],
  green: [130, 95, 25],
  red: [0, 95, 35],
  purple: [270, 85, 40],
};

function ThemeDropdown() {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("macvg-themes");
    if (saved) {
      setTheme(JSON.parse(saved).theme);
    } else {
      setTheme("orange");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && colors[theme]) {
      const primary = `${colors[theme][0]} ${colors[theme][1]}% ${colors[theme][2]}%`;
      const primaryHover = `${colors[theme][0]} ${colors[theme][1]}% ${colors[theme][2] - 5}%`;
      const secondary = `${colors[theme][0] + 30} ${colors[theme][1]}% ${colors[theme][2]}%`;
      document.documentElement.style.setProperty("--primary", primary);
      document.documentElement.style.setProperty("--primary-hover", primaryHover);
      document.documentElement.style.setProperty("--secondary", secondary);
      const themes: Record<string, string> = { theme, primary, primaryHover, secondary };
      localStorage.setItem("macvg-themes", JSON.stringify(themes));
      window.dispatchEvent(new CustomEvent("theme-change", { detail: { theme } }));
    }
  }, [theme]);

  return (
    <select
      className="bg-gray-200 dark:bg-gray-950 border-2 border-gray-700 text-black dark:text-white rounded-lg text-lg cursor-pointer outline-none py-2 appearance-none w-25 text-center duration-300 hover:bg-gray-300 hover:dark:bg-gray-900"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="orange">Sun</option>
      <option value="blue">Ocean</option>
      <option value="green">Forest</option>
      <option value="red">Mars</option>
      <option value="purple">Hollow</option>
    </select>
  );
}

export default ThemeDropdown;

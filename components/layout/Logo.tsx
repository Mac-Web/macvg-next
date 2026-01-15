"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const hues: Record<string, number> = {
  orange: 0,
  blue: 180,
  green: 90,
  red: 320,
  purple: 230,
};

function Logo() {
  const [hueRotate, setHueRotate] = useState<number>(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("macvg-themes");
    if (savedTheme) {
      const { theme } = JSON.parse(savedTheme);
      setHueRotate(hues[theme]);
    }
    const handleThemeChange = (e: any) => {
      setHueRotate(hues[e.detail?.theme]);
    };

    window.addEventListener("theme-change", handleThemeChange);

    return () => {
      window.removeEventListener("theme-change", handleThemeChange);
    };
  }, []);

  return <Image src="/logo.png" alt="MacVG Logo" style={{ filter: `hue-rotate(${hueRotate}deg)` }} width={35} height={35} />;
}

export default Logo;

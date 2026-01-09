"use client";

import { ThemeProvider } from "next-themes";

function Theme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export default Theme;

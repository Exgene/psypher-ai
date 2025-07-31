"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
} 
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export function ClerkProviderWithTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        variables: {
          colorPrimary: "hsl(var(--primary))",
          colorText: "hsl(var(--foreground))",
          colorBackground: "hsl(var(--background))",
          colorInputBackground: "hsl(var(--input))",
          colorInputText: "hsl(var(--foreground))",
          colorTextOnPrimaryBackground: "hsl(var(--primary-foreground))",
        },
        elements: {
          card: {
            backgroundColor: "hsl(var(--card))",
            boxShadow: "none",
            border: "1px solid hsl(var(--border))",
          },
          socialButtonsBlockButton:
            "border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
} 
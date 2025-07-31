import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProviderWithTheme } from "@/components/ClerkProviderWithTheme";
import { Header } from "@/components/layout/Header";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Showcase - Exclusive Tier-Based Events",
  description: "Discover exclusive events tailored to your membership tier. Join premium experiences and connect with your community.",
  keywords: ["events", "membership", "tier", "exclusive", "community"],
  authors: [{ name: "Event Showcase Team" }],
  openGraph: {
    title: "Event Showcase - Exclusive Tier-Based Events",
    description: "Discover exclusive events tailored to your membership tier.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProviderWithTheme>
            <ErrorBoundary>
              <div className="flex min-h-screen flex-col">
                <Header />
                
                {/* Main Content */}
                <main className="flex-1">
                  {children}
                </main>
                
                {/* Footer */}
                <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
                  <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          © 2024 Event Showcase. All rights reserved.
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                        <a href="#" className="hover:text-foreground transition-colors">Support</a>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </ErrorBoundary>
          </ClerkProviderWithTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}

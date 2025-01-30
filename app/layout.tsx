import "./globals.css";
import CookiesProviderLayout from "@/components/CookiesProvider";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <CookiesProviderLayout>
        <html lang="en" suppressHydrationWarning>
          <body>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </html>
      </CookiesProviderLayout>
    </SessionProvider>
  );
}

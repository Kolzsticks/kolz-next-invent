import './globals.css'
import CookiesProviderLayout from '@/components/CookiesProvider';
import { SessionProvider } from 'next-auth/react';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <CookiesProviderLayout>
        <html lang="en">
          <body>
            {children}
          </body>
        </html>
      </CookiesProviderLayout>
    </SessionProvider>
  );
}
import { CookiesProvider } from 'next-client-cookies/server';

export default function CookiesProviderLayout({ children }: {children: React.ReactNode}) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
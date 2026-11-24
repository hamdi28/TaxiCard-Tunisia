import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaxiCard Tunisia — Demo',
  description: 'Save your taxi driver card to Google Wallet.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

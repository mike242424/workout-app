import type { Metadata } from 'next';
import './globals.css';
import QueryClientContextProvider from '@/context/query-client-context-provider';
import Navbar from '@/components/navbar';
import { Oswald } from 'next/font/google';

const oswald = Oswald({ subsets: ['latin'], weight: '600' });

export const metadata: Metadata = {
  title: 'Lift',
  description:
    'Lift is a workout tracking application designed to help you manage and optimize your fitness routine.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={oswald.className}>
        <QueryClientContextProvider>
          <Navbar />
          {children}
        </QueryClientContextProvider>
      </body>
    </html>
  );
}

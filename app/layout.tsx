import type { Metadata } from 'next';
import './globals.css';
import QueryClientContextProvider from '@/context/query-client-context-provider';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Workout App',
  description: 'Workout App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientContextProvider>
          <Navbar />
          {children}
        </QueryClientContextProvider>
      </body>
    </html>
  );
}

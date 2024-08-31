import './globals.css';

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next App /w Aceternity UI',
  description: 'Generated by create next app'
};

const RootLayout = ({ children }: Readonly<React.PropsWithChildren>) => (
  <html lang="en">
    <body className={inter.className}>
      {children}
    </body>
  </html>
);

export default RootLayout;

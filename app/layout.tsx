import type {Metadata} from 'next';
import { Inter, Outfit, Geist } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";
import { WoodProvider } from '@/lib/context/WoodContext';
import { CustomerProvider } from '@/lib/context/CustomerContext';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Aranya Furniture & Wood ERP',
  description: 'Premium ERP and POS system for furniture and wood businesses in Bangladesh.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn(outfit.variable, "font-sans", geist.variable)}>
      <body suppressHydrationWarning className="bg-[#F8F9FA] text-[#1A1A1A] font-sans">
        <CustomerProvider>
          <WoodProvider>
            {children}
          </WoodProvider>
        </CustomerProvider>
      </body>
    </html>
  );
}

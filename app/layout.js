import './globals.css';
import { Playfair_Display, DM_Sans } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Pettagama.lk - Premium Raw Materials for Arts & Crafts',
  description: 'Discover the finest quality raw materials for all your arts and crafts creations. Beads, Threads, Butterfly Embellishments, Charms & more. Island-wide delivery in Sri Lanka.',
  keywords: 'pettagama, arts crafts sri lanka, beads, threads, butterfly embellishments, jewelry making, craft materials',
  openGraph: {
    title: 'Pettagama.lk',
    description: 'Premium Raw Materials for Arts & Crafts — Sri Lanka',
    url: 'https://pettagama.lk',
    siteName: 'Pettagama.lk',
    locale: 'en_LK',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

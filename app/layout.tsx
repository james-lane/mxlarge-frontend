import { SpeedInsights } from '@vercel/speed-insights/next';
import { Header } from '@/lib/header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Footer } from '@/lib/footer';
import styles from './layout.module.css';
import { BackgroundWallpaper } from '@/lib/backgroundWallpaper';
import { NewSitePopup } from '@/lib/newSitePopup';
import { Suspense } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
config.autoAddCss = false;

export const runtime = 'edge';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MX Large',
  description: 'Your One Stop Motocross News Site.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SpeedInsights />
      <body className={inter.className}>
        <BackgroundWallpaper />
        <Header />
        <div className={styles.container}>
          <div className={styles.content}>{children}</div>
        </div>
        <Footer />
        <Suspense>
          <NewSitePopup />
        </Suspense>
        <GoogleAnalytics gaId="G-D85QCRQGHH" />
      </body>
    </html>
  );
}

// src/app/layout.tsx

import "./globals.css";
import { Inter, Geologica } from "next/font/google";
import type { Metadata } from "next";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const geo = Geologica({
  subsets: ["cyrillic"],
  weight: ["100", "400", "500", "700", "900"],
  variable: "--font-geologica",
});

export const metadata: Metadata = {
  title: "Заметки и календарь для бухгалтера",
  description:
    "Современный онлайн-календарь с функцией заметок для бухгалтерии: напоминания, дедлайны, важные даты, удобные инструменты для профессионалов.",
  keywords: [
    "бухгалтерский календарь",
    "заметки бухгалтера",
    "онлайн бухгалтерия",
    "напоминания для бухгалтера",
    "дедлайны бухгалтерия",
    "календарь налогов",
    "учёт задач",
    "бухгалтерские инструменты",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Заметки и календарь для бухгалтера",
    description:
      "Профессиональный инструмент для учёта, напоминаний и важных дат бухгалтерии.",
    url: "https://buhplanner.ru/",
    siteName: "БухКалендарь",
    images: [
      {
        url: "/share.png",
        width: 1200,
        height: 630,
        alt: "Логотип Бухгалтерского календаря",
      },
    ],
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Заметки и календарь для бухгалтера",
    description:
      "Современный инструмент для напоминаний и управления датами в бухгалтерии.",
    images: ["/share.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${geo.variable}`}>
      <body className="font-inter bg-white text-gray-900">
            {children}

      </body>
    </html>
  );
}

// frontend-v2/src/app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://putraadityamotor.id"),
  title: {
    default:
      "Putra Aditya Motor — Jual Beli Mobil Bekas Cepat & Terpercaya Jabodetabek",
    template: "%s | Putra Aditya Motor",
  },
  description:
    "Showroom & platform jual beli mobil bekas terpercaya di Jabodetabek. Dana cair 30 menit, harga transparan terbaik, dan layanan inspeksi gratis langsung ke rumah Anda.",
  keywords: [
    "jual mobil bekas",
    "jual beli mobil bekas",
    "jual mobil cepat",
    "jual mobil bekas jakarta",
    "jual mobil bekas depok",
    "jual mobil bekas tangerang",
    "jual mobil bekas bekasi",
    "jual mobil bekas bogor",
    "showroom mobil jabodetabek",
    "inspeksi mobil gratis",
    "putra aditya motor",
    "pam motor",
    "tukar tambah mobil",
  ],
  authors: [{ name: "Putra Aditya Motor", url: "https://putraadityamotor.id" }],
  creator: "Putra Aditya Motor",
  publisher: "Putra Aditya Motor",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Putra Aditya Motor — Jual Beli Mobil Bekas Cepat & Terpercaya Jabodetabek",
    description:
      "Dana cair 30 menit & inspeksi gratis langsung ke rumah Anda di seluruh Jabodetabek. Proses transparan, aman, dan tanpa biaya admin.",
    url: "https://putraadityamotor.id",
    siteName: "Putra Aditya Motor",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Putra Aditya Motor — Pusat Jual Beli Mobil Bekas Jabodetabek",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Putra Aditya Motor — Jual Beli Mobil Bekas Cepat & Terpercaya",
    description:
      "Dana cair 30 menit & inspeksi gratis langsung ke rumah Anda di seluruh Jabodetabek.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/logo-square.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="overflow-x-clip max-w-full">
      <body
        className={`${jakarta.variable} antialiased overflow-x-clip max-w-full`}
      >
        <div className="relative w-full max-w-full overflow-x-clip">
          {children}
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

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
  title: "JualMobilku",
  description: "Platform jual beli mobil bekas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="overflow-x-hidden max-w-full">
      <body className={`${jakarta.variable} antialiased overflow-x-hidden max-w-full`}>
        <div className="relative w-full max-w-full overflow-x-hidden">
          {children}
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

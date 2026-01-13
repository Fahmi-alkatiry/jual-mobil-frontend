"use client";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";


export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Header /> */}
      {children}
      <FloatingWhatsApp />
      {/* <Footer /> */}
    </>
  );
}

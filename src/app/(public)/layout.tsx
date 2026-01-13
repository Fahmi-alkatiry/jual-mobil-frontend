import Header from "@/components/header/Header.server";
import Footer from "@/components/Footer";
import LayoutClient from "@/components/LayoutClient";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
        <LayoutClient>
        {children}
      </LayoutClient>
      <Footer />
    </>
  );
}

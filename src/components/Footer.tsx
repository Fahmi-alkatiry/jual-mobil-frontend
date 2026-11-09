import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-10">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="inline-flex items-center bg-white rounded-2xl px-3.5 py-2 shadow-sm hover:opacity-95 transition-opacity"
            aria-label="Beranda Putra Aditya Motor"
          >
            <Image
              src="/logo.png"
              alt="Putra Aditya Motor"
              width={160}
              height={55}
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Putra Aditya Motor. Semua hak
            dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

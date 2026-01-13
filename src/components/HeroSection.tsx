import CarEstimationForm from "./CarEstimationForm.client";

const HeroSection = () => {
  return (
    <section id="hero" className="relative py-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* 🔥 LCP ELEMENT */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Jual Mobil Bekas Anda.{" "}
            <span className="text-primary">Bayar Tunai Hari Ini.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proses inspeksi 30 menit. Kami jemput ke rumah Anda.
          </p>
        </div>

        {/* 🚀 Client-only form */}
        <CarEstimationForm />
      </div>
    </section>
  );
};

export default HeroSection;

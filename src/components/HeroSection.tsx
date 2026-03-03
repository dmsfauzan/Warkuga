import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToMenu = () => {
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsla(20, 15%, 15%, 0.5) 0%, hsla(20, 15%, 15%, 0.75) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block text-accent font-medium tracking-widest uppercase text-sm mb-4 animate-fade-up opacity-0">
          Selamat Datang di
        </span>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fade-up opacity-0 delay-100">
          WARKUGA
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-fade-up opacity-0 delay-200 font-light">
          Warung Kumpul Warga
        </p>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-fade-up opacity-0 delay-200 font-light">
          Sebuah tempat yang nyaman dan hangat di mana cita rasa Indonesia yang autentik bertemu dengan budaya kafe modern.
          Rasakan kehangatan rumah dalam setiap tegukan dan gigitan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0 delay-300">
          <Button
            size="lg"
            onClick={scrollToMenu}
            className="gradient-bg text-primary-foreground text-lg px-8 py-6 hover:opacity-90 transition-opacity hover-lift"
          >
            Menu Kami
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToContact}
            className="border-white/50 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white text-lg px-8 py-6 transition-all hover-lift"
          >
            Pesan Tempat
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>
  );
};

export default HeroSection;

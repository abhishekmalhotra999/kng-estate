import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ExperienceSection from "@/components/home/ExperienceSection";
import ValueSection from "@/components/home/ValueSection";
import WhyUs from "@/components/home/WhyUs";
import AboutTeaser from "@/components/home/AboutTeaser";
import SellPropertyPromo from "@/components/home/SellPropertyPromo";
import ContactSection from "@/components/home/ContactSection";

const Home = () => {
  const [showStickyCta, setShowStickyCta] = useState(true);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCta(!entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: "0px 0px 120px 0px" }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-24 md:pb-0">
        <Hero />
        <ExperienceSection />
        <ValueSection />
        <WhyUs />
        <AboutTeaser />
        <SellPropertyPromo />
        <ContactSection />
      </main>

      {showStickyCta && (
        <Link
          to="/contact"
          className="fixed md:hidden bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-4 right-4 z-30 min-h-[52px] inline-flex items-center justify-center rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--kng-ink)] shadow-lg"
          style={{ backgroundImage: "linear-gradient(to right, var(--kng-gold), var(--kng-gold-deep))" }}
        >
          Book a Consultation
        </Link>
      )}

      <Footer />
    </div>
  );
};

export default Home;

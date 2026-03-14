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
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ExperienceSection />
        <ValueSection />
        <WhyUs />
        <AboutTeaser />
        <SellPropertyPromo />
        <ContactSection />
      </main>

      <a
        href="/contact"
        className="fixed md:hidden bottom-4 left-4 right-4 z-30 min-h-[52px] inline-flex items-center justify-center rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--kng-ink)] shadow-lg"
        style={{ backgroundImage: "linear-gradient(to right, var(--kng-gold), var(--kng-gold-deep))" }}
      >
        Book a Consultation
      </a>

      <Footer />
    </div>
  );
};

export default Home;

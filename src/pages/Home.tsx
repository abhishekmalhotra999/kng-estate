import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ExperienceSection from "@/components/home/ExperienceSection";
import ValueSection from "@/components/home/ValueSection";
import WhyUs from "@/components/home/WhyUs";
import AboutTeaser from "@/components/home/AboutTeaser";
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
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

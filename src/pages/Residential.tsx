import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/shared/ServiceHero";
import ContactSection from "@/components/home/ContactSection";
import residentialImg from "@/assets/residential.jpg";
import { Home, Key, FileText, TrendingUp, Shield, Users } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const services = [
  {
    icon: Home,
    number: "01",
    title: "Property Search & Matching",
    description:
      "We curate a tailored selection of homes based on your lifestyle, preferences, and budget — so you only see what truly matters.",
  },
  {
    icon: Key,
    number: "02",
    title: "Home Tours & Walkthroughs",
    description:
      "Experience properties with our expert guidance. We highlight the details others miss and ask the questions you haven't thought of.",
  },
  {
    icon: FileText,
    number: "03",
    title: "Paperwork & Legal Support",
    description:
      "From offer to closing, we handle the documentation with precision, keeping you informed at every step.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Market Analysis & Pricing",
    description:
      "Data-driven pricing strategies ensure you never overpay as a buyer or undervalue as a seller.",
  },
  {
    icon: Shield,
    number: "05",
    title: "Home Inspection Guidance",
    description:
      "We connect you with trusted inspectors and help you understand every finding before you commit.",
  },
  {
    icon: Users,
    number: "06",
    title: "Post-Sale Support",
    description:
      "Our relationship doesn't end at closing. We're here for referrals, advice, and your next move.",
  },
];

const Residential = () => {
  const contentRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // ─── Text color reveal for the manifesto ───
      const words = gsap.utils.toArray(".res-reveal-word") as HTMLElement[];
      words.forEach((word) => {
        gsap.fromTo(
          word,
          { color: "rgba(0,0,0,0.08)" },
          {
            color: "rgba(0,0,0,0.85)",
            ease: "none",
            scrollTrigger: {
              trigger: word,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });

      // Gold word reveal
      const goldWords = gsap.utils.toArray(
        ".res-reveal-gold"
      ) as HTMLElement[];
      goldWords.forEach((word) => {
        gsap.fromTo(
          word,
          { color: "rgba(150,120,60,0.08)" },
          {
            color: "hsl(38, 50%, 40%)",
            ease: "none",
            scrollTrigger: {
              trigger: word,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });

      // ─── Service cards: scrub-driven stagger ───
      const cards = gsap.utils.toArray(".res-service-card") as HTMLElement[];
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 65%",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: contentRef }
  );

  const renderWords = (text: string, isGold = false) =>
    text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`${isGold ? "res-reveal-gold italic" : "res-reveal-word"} inline-block mr-[0.28em]`}
      >
        {word}
      </span>
    ));

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ServiceHero
          title="Residential Real Estate"
          subtitle="Find Your Dream Home"
          description="Whether you're a first-time buyer or seasoned homeowner, our team guides you through every step with care and expertise."
          image={residentialImg}
        />

        {/* ─── Manifesto section ─── */}
        <section
          ref={contentRef}
          className="bg-[#f8f5ee] py-24 md:py-36 px-6 md:px-12 lg:px-20 xl:px-28"
        >
          <div className="container mx-auto">
            <div className="max-w-4xl mb-20 md:mb-24">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] text-gray-900/95">
                {renderWords("Your home is more than an address.")}
                <br className="hidden md:block" />
                {renderWords("It's where", true)}{" "}
                {renderWords("life unfolds,", true)}
                <br className="hidden md:block" />
                {renderWords("memories are made, and")}
                <br className="hidden md:block" />
                {renderWords("futures are built.", true)}
              </h2>
            </div>

            {/* ─── Services Grid ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((item) => (
                <div
                  key={item.title}
                  className="res-service-card group relative p-8 md:p-10 border border-[#d9cfbd] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_34px_rgba(0,0,0,0.08)] hover:border-[#c9a96e]/50 transition-all duration-500"
                >
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-10 h-[1px] bg-gradient-to-l from-[#c9a96e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 h-10 w-[1px] bg-gradient-to-b from-[#c9a96e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Number */}
                  <span className="block font-heading text-5xl font-light text-[#b8924f]/90 group-hover:text-[#a88445] transition-colors duration-500 mb-5 select-none leading-none">
                    {item.number}
                  </span>

                  {/* Icon */}
                  <div className="w-11 h-11 flex items-center justify-center border border-[#c9a96e]/20 text-[#c9a96e]/80 group-hover:text-[#c9a96e] group-hover:border-[#c9a96e]/40 mb-5 transition-all duration-500">
                    <item.icon size={20} strokeWidth={1.2} />
                  </div>

                  <h3 className="text-[1.35rem] font-heading font-medium mb-3 text-gray-900/92 leading-tight group-hover:text-[#a88445] transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-gray-700/80 leading-[1.75] font-normal transition-colors duration-500">
                    {item.description}
                  </p>

                  {/* Bottom line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9a96e]/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Residential;

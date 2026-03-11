import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/shared/ServiceHero";
import ContactSection from "@/components/home/ContactSection";
import commercialImg from "@/assets/commercial.jpg";
import { Building2, BarChart3, Briefcase, Globe, ShieldCheck, LineChart } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const services = [
  {
    icon: Building2,
    number: "01",
    title: "Office & Retail Spaces",
    description:
      "From prime retail locations to modern office parks, we match businesses with spaces that accelerate growth.",
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Investment Analysis",
    description:
      "Detailed ROI projections, cap rate analysis, and market comparables for every commercial opportunity.",
  },
  {
    icon: Briefcase,
    number: "03",
    title: "Lease Negotiation",
    description:
      "We negotiate favorable terms that protect your interests and maximize your operational efficiency.",
  },
  {
    icon: Globe,
    number: "04",
    title: "Market Intelligence",
    description:
      "Stay ahead with our deep understanding of Tricity's commercial growth corridors and emerging hotspots.",
  },
  {
    icon: ShieldCheck,
    number: "05",
    title: "Due Diligence",
    description:
      "Comprehensive property assessments, zoning verification, and legal compliance checks before you commit.",
  },
  {
    icon: LineChart,
    number: "06",
    title: "Portfolio Management",
    description:
      "Ongoing advisory for investors managing multiple commercial assets across the Tricity region.",
  },
];

const Commercial = () => {
  const contentRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Text color reveal
      const words = gsap.utils.toArray(".com-reveal-word") as HTMLElement[];
      words.forEach((word) => {
        gsap.fromTo(
          word,
          { color: "rgba(255,255,255,0.08)" },
          {
            color: "rgba(255,255,255,1)",
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

      const goldWords = gsap.utils.toArray(".com-reveal-gold") as HTMLElement[];
      goldWords.forEach((word) => {
        gsap.fromTo(
          word,
          { color: "rgba(201,169,110,0.08)" },
          {
            color: "rgba(201,169,110,1)",
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

      // Service cards
      const cards = gsap.utils.toArray(".com-card") as HTMLElement[];
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
        className={`${isGold ? "com-reveal-gold italic" : "com-reveal-word"} inline-block mr-[0.28em]`}
      >
        {word}
      </span>
    ));

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ServiceHero
          title="Commercial Real Estate"
          subtitle="Invest in Your Future"
          description="From office spaces to retail units, we help businesses and investors find the perfect commercial property to grow and thrive."
          image={commercialImg}
        />

        {/* Manifesto */}
        <section
          ref={contentRef}
          className="bg-white text-gray-900 py-28 md:py-40 px-6 md:px-12 lg:px-20 xl:px-28"
        >
          <div className="container mx-auto">
            <div className="max-w-4xl mb-28">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15]">
                {renderWords("Your business deserves a space that")}
                <br className="hidden md:block" />
                {renderWords("matches your", true)}{" "}
                {renderWords("ambition.", true)}
                <br className="hidden md:block" />
                {renderWords("We find the address that fuels growth.")}
              </h2>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((item) => (
                <div
                  key={item.title}
                  className="com-card group relative p-8 md:p-10 border border-black/[0.05] bg-black/[0.02] hover:bg-black/[0.03] hover:border-[#c9a96e]/20 transition-all duration-700"
                >
                  <div className="absolute top-0 right-0 w-10 h-[1px] bg-gradient-to-l from-[#c9a96e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 h-10 w-[1px] bg-gradient-to-b from-[#c9a96e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <span className="block font-heading text-5xl font-light text-[#c9a96e]/60 group-hover:text-[#c9a96e]/60 transition-colors duration-700 mb-5 select-none leading-none">
                    {item.number}
                  </span>

                  <div className="w-11 h-11 flex items-center justify-center border border-[#c9a96e]/20 text-[#c9a96e]/80 group-hover:text-[#c9a96e] group-hover:border-[#c9a96e]/40 mb-5 transition-all duration-500">
                    <item.icon size={20} strokeWidth={1.2} />
                  </div>

                  <h3 className="text-lg font-heading font-medium mb-3 text-gray-900 group-hover:text-[#c9a96e] transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-light group-hover:text-gray-600 transition-colors duration-500">
                    {item.description}
                  </p>

                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9a96e]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
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

export default Commercial;

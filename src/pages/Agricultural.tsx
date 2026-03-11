import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/shared/ServiceHero";
import ContactSection from "@/components/home/ContactSection";
import agriImg from "@/assets/agricultural.jpg";
import { Sprout, Mountain, Droplets, Scale, FileCheck, Landmark } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const services = [
  {
    icon: Sprout,
    number: "01",
    title: "Farmland Acquisition",
    description:
      "We source fertile, investment-grade agricultural land with verified soil quality, water access, and growth potential.",
  },
  {
    icon: Mountain,
    number: "02",
    title: "Rural Estate Planning",
    description:
      "From sprawling estates to hobby farms, we help you find rural properties that match your vision and lifestyle.",
  },
  {
    icon: Droplets,
    number: "03",
    title: "Water & Irrigation Rights",
    description:
      "We navigate the complexities of water rights and irrigation access to ensure your land works for you year-round.",
  },
  {
    icon: Scale,
    number: "04",
    title: "Zoning & Land Use",
    description:
      "Expert guidance on agricultural zoning regulations, ALR assessments, and permitted land-use conversions.",
  },
  {
    icon: FileCheck,
    number: "05",
    title: "Due Diligence",
    description:
      "Comprehensive environmental assessments, title searches, and encumbrance verification before you invest.",
  },
  {
    icon: Landmark,
    number: "06",
    title: "Long-Term Investment Strategy",
    description:
      "Agricultural land is one of the most stable assets. We help you build a portfolio with generational value.",
  },
];

const Agricultural = () => {
  const contentRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray(".agr-reveal-word") as HTMLElement[];
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

      const goldWords = gsap.utils.toArray(".agr-reveal-gold") as HTMLElement[];
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

      const cards = gsap.utils.toArray(".agr-card") as HTMLElement[];
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
        className={`${isGold ? "agr-reveal-gold italic" : "agr-reveal-word"} inline-block mr-[0.28em]`}
      >
        {word}
      </span>
    ));

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ServiceHero
          title="Agricultural Land"
          subtitle="Roots in the Land"
          description="Explore vast agricultural opportunities. From farmland to rural estates, we connect you with land that works as hard as you do."
          image={agriImg}
        />

        <section
          ref={contentRef}
          className="bg-white py-28 md:py-40 px-6 md:px-12 lg:px-20 xl:px-28"
        >
          <div className="container mx-auto">
            <div className="max-w-4xl mb-28">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15]">
                {renderWords("The land beneath your feet is the")}
                <br className="hidden md:block" />
                {renderWords("most honest", true)}{" "}
                {renderWords("investment", true)}
                <br className="hidden md:block" />
                {renderWords("you'll ever make.")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((item) => (
                <div
                  key={item.title}
                  className="agr-card group relative p-8 md:p-10 border border-gray-100 hover:border-[#c9a96e]/30 bg-white hover:bg-gray-50/50 transition-all duration-700"
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
                  <p className="text-sm text-gray-500 leading-relaxed font-light group-hover:text-gray-500 transition-colors duration-500">
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

export default Agricultural;

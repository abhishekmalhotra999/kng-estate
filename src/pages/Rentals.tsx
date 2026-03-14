import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/shared/ServiceHero";
import ContactSection from "@/components/home/ContactSection";
import rentalsImg from "@/assets/hero-home.jpg";
import { Home, Key, FileText, TrendingUp, Shield, Users } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const services = [
  {
    icon: Home,
    number: "01",
    title: "Curated Rental Listings",
    description:
      "Handpicked residential, commercial, and agricultural rental opportunities aligned with your goals and budget.",
  },
  {
    icon: Key,
    number: "02",
    title: "Tenant and Occupant Matching",
    description:
      "We screen and match applicants thoughtfully to protect your property standards and long-term returns.",
  },
  {
    icon: FileText,
    number: "03",
    title: "Lease Structuring and Documentation",
    description:
      "Professionally drafted terms with clear protections, timelines, and obligations for all parties.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Rental Pricing Strategy",
    description:
      "Data-backed rent positioning that balances premium value, occupancy, and market competitiveness.",
  },
  {
    icon: Shield,
    number: "05",
    title: "Compliance and Risk Guidance",
    description:
      "Support on legal checks, policy adherence, and practical safeguards before lease finalization.",
  },
  {
    icon: Users,
    number: "06",
    title: "Renewal and Portfolio Advisory",
    description:
      "Ongoing support for renewals, transitions, and scaling your rental portfolio with confidence.",
  },
];

const Rentals = () => {
  const contentRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray(".ren-reveal-word") as HTMLElement[];
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

      const goldWords = gsap.utils.toArray(".ren-reveal-gold") as HTMLElement[];
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

      const cards = gsap.utils.toArray(".ren-card") as HTMLElement[];
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
        className={`${isGold ? "ren-reveal-gold italic" : "ren-reveal-word"} inline-block mr-[0.28em]`}
      >
        {word}
      </span>
    ));

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ServiceHero
          title="Rental Properties"
          subtitle="Lease With Confidence"
          description="We handle rentals of all types across Tricity, including residential, commercial, and agricultural properties with complete end-to-end support."
          image={rentalsImg}
        />

        <section
          ref={contentRef}
          className="bg-[#f8f5ee] py-24 md:py-36 px-6 md:px-12 lg:px-20 xl:px-28"
        >
          <div className="container mx-auto">
            <div className="max-w-4xl mb-20 md:mb-24">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15]">
                {renderWords("Exceptional rentals are not found by chance.")}
                <br className="hidden md:block" />
                {renderWords("They are", true)} {renderWords("curated,", true)}
                <br className="hidden md:block" />
                {renderWords("negotiated, and managed")}
                <br className="hidden md:block" />
                {renderWords("for long-term peace of mind.", true)}
              </h2>

              <p className="mt-10 text-base md:text-lg text-gray-700 font-normal leading-relaxed max-w-3xl">
                Looking to rent in Tricity? From family homes and premium apartments to office spaces,
                retail units, and agricultural land, our team manages everything for you. Just get in
                touch, share your requirement, and we will handle the search, negotiation, paperwork,
                and handover from start to finish.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((item) => (
                <div
                  key={item.title}
                  className="ren-card group relative p-8 md:p-10 border border-[#d9cfbd] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_34px_rgba(0,0,0,0.08)] hover:border-[#c9a96e]/50 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-10 h-[1px] bg-gradient-to-l from-[#c9a96e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 h-10 w-[1px] bg-gradient-to-b from-[#c9a96e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <span className="block font-heading text-5xl font-light text-[#b8924f] group-hover:text-[#a88445] transition-colors duration-500 mb-5 select-none leading-none">
                    {item.number}
                  </span>

                  <div className="w-11 h-11 flex items-center justify-center border border-[#c9a96e]/20 text-[#c9a96e]/80 group-hover:text-[#c9a96e] group-hover:border-[#c9a96e]/40 mb-5 transition-all duration-500">
                    <item.icon size={20} strokeWidth={1.2} />
                  </div>

                  <h3 className="text-[1.35rem] font-heading font-medium mb-3 text-gray-900 leading-tight group-hover:text-[#a88445] transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-gray-700 leading-[1.75] font-normal transition-colors duration-500">
                    {item.description}
                  </p>

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

export default Rentals;

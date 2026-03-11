import { useState, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronDown, Minus, Plus } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const faqs = [
  {
    number: "01",
    q: "What makes KNG Estate different?",
    a: "We combine deep market knowledge with genuine care for our clients. Transparency, honesty, and empowerment are at the heart of everything we do. We don't just close deals — we build lasting relationships.",
  },
  {
    number: "02",
    q: "How does KNG Estate ensure transparency?",
    a: "We provide detailed market reports, explain every fee, and keep you informed at every stage. No hidden costs, no surprises. You'll always know exactly where you stand.",
  },
  {
    number: "03",
    q: "Why shouldn't I wait for the market to cool?",
    a: "Timing the market perfectly is nearly impossible. Interest rates, inventory, and demand shift constantly. By working with us, you'll make a well-informed decision at the right time for your unique situation rather than trying to predict the unpredictable.",
  },
  {
    number: "04",
    q: "How do you empower your clients?",
    a: "We educate you on market trends, pricing strategies, and negotiation tactics so you feel confident making the best decisions for your family or business.",
  },
  {
    number: "05",
    q: "What areas do you serve?",
    a: "We primarily serve Chandigarh, Mohali, and Panchkula — the Tricity region. Our deep local knowledge gives you a competitive edge in these markets.",
  },
];

const FAQItem = ({
  number,
  q,
  a,
  isOpen,
  onToggle,
}: {
  number: string;
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className={`faq-item border-b border-black/[0.05] transition-all duration-500 ${isOpen ? "bg-black/[0.02]" : ""}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-5 md:gap-8 py-7 md:py-9 px-1 text-left group"
      >
        <span className="font-heading text-2xl md:text-3xl font-light text-[#c9a96e]/20 group-hover:text-[#c9a96e]/40 transition-colors duration-500 leading-none shrink-0 select-none">
          {number}
        </span>
        <span className="flex-1 font-heading font-medium text-lg md:text-xl text-gray-900 group-hover:text-[#c9a96e] transition-colors duration-500">
          {q}
        </span>
        <span className="shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-black/5 text-gray-600 group-hover:border-[#c9a96e]/30 group-hover:text-[#c9a96e] transition-all duration-500">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="pl-12 md:pl-[4.5rem] pr-16 pb-8">
          <div className="w-8 h-[1px] bg-[#c9a96e]/30 mb-4" />
          <p className="text-gray-600 leading-[1.8] font-light text-sm md:text-base">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
};

const OurApproach = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Eyebrow
      gsap.fromTo(
        ".approach-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.3 }
      );

      // Title words
      const words = gsap.utils.toArray(
        ".approach-title-word"
      ) as HTMLElement[];
      gsap.fromTo(
        words,
        { y: 60, opacity: 0, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.4,
        }
      );

      // Line
      gsap.fromTo(
        ".approach-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          transformOrigin: "left",
          delay: 0.7,
        }
      );

      // Description
      gsap.fromTo(
        ".approach-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.9 }
      );

      // FAQ items — stagger on scroll
      const faqItems = gsap.utils.toArray(".faq-item") as HTMLElement[];
      faqItems.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "top 70%",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="min-h-screen bg-[#FCFBF8] text-gray-900">
      <Header />
      <main>
        {/* ─── Hero Area ─── */}
        <section className="relative pt-36 md:pt-44 pb-20 px-6 md:px-12 lg:px-20 xl:px-28 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#c9a96e]/[0.03] blur-[150px] rounded-full pointer-events-none" />

          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
              <div>
                <span className="approach-eyebrow inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e] mb-6">
                  <span className="block w-8 h-[1px] bg-[#c9a96e]/50" />
                  Our Philosophy
                </span>

                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-medium leading-[1.05] mb-8"
                  style={{ perspective: "800px" }}
                >
                  {["Our"].map((word, i) => (
                    <span
                      key={i}
                      className="approach-title-word inline-block mr-[0.25em]"
                    >
                      {word}
                    </span>
                  ))}
                  <span className="approach-title-word inline-block mr-[0.25em] italic font-light text-[#c9a96e]">
                    Approach
                  </span>
                  <br />
                  {["to", "Real", "Estate"].map((word, i) => (
                    <span
                      key={i}
                      className="approach-title-word inline-block mr-[0.25em] text-gray-600"
                    >
                      {word}
                    </span>
                  ))}
                </h1>
              </div>

              <div className="lg:pb-4">
                <div className="approach-line w-16 h-[2px] bg-[#c9a96e] mb-6" />
                <p className="approach-desc text-lg text-gray-600 font-light leading-relaxed max-w-md">
                  Transparency, communication, and client empowerment drive
                  every decision we make. Here are the questions our clients
                  ask most.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <section className="bg-white px-6 md:px-12 lg:px-20 xl:px-28 py-32">
          <div className="container mx-auto max-w-4xl">
            <div>
              {faqs.map((faq, i) => (
                <FAQItem
                  key={faq.q}
                  {...faq}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OurApproach;

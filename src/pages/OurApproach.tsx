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
      className={`faq-item border mb-3 transition-all duration-500 ${isOpen ? "border-[#ceb787] bg-white shadow-[0_12px_28px_rgba(0,0,0,0.05)]" : "border-[#ded4c4] bg-[#fbf9f4] hover:bg-white"}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 md:gap-7 py-6 md:py-8 px-5 md:px-8 text-left group"
      >
        <span className="font-heading text-2xl md:text-3xl font-light text-[#b8924f]/55 group-hover:text-[#a88445] transition-colors duration-500 leading-none shrink-0 select-none">
          {number}
        </span>
        <span className="flex-1 font-heading font-medium text-lg md:text-[1.42rem] text-gray-900/92 group-hover:text-[#a88445] transition-colors duration-500 leading-snug pr-2">
          {q}
        </span>
        <span className="shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-[#d8ceba] text-gray-700 bg-[#fdfbf7] group-hover:border-[#c9a96e]/50 group-hover:text-[#a88445] transition-all duration-500">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="pl-14 md:pl-[5.1rem] pr-10 md:pr-16 pb-7 md:pb-8">
          <div className="w-8 h-[1px] bg-[#c9a96e]/30 mb-4" />
          <p className="text-gray-700/80 leading-[1.9] text-[15px] md:text-base">
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
    <div ref={container} className="min-h-screen bg-[#f8f5ee] text-gray-900">
      <Header />
      <main>
        {/* ─── Hero Area ─── */}
        <section className="relative pt-32 md:pt-40 pb-14 md:pb-16 px-6 md:px-12 lg:px-20 xl:px-28 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#c9a96e]/[0.03] blur-[150px] rounded-full pointer-events-none" />

          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
              <div>
                <span className="approach-eyebrow inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e]/85 mb-6">
                  <span className="block w-8 h-[1px] bg-[#c9a96e]/50" />
                  Our Philosophy
                </span>

                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-medium leading-[1.05] mb-8 text-gray-900/95"
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
                      className="approach-title-word inline-block mr-[0.25em] text-gray-700/80"
                    >
                      {word}
                    </span>
                  ))}
                </h1>
              </div>

              <div className="lg:pb-4">
                <div className="approach-line w-16 h-[2px] bg-[#c9a96e] mb-6" />
                <p className="approach-desc text-lg text-gray-700/80 font-normal leading-relaxed max-w-lg">
                  Transparency, communication, and client empowerment drive
                  every decision we make. Here are the questions our clients
                  ask most.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <section className="bg-[#f4f1e9] px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-20">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-7 md:mb-9">
              <span className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.33em] uppercase text-[#8f7442]/80">
                <span className="block w-7 h-[1px] bg-[#c9a96e]/50" />
                Frequently Asked Questions
              </span>
            </div>
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

import { useState, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronDown } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const faqs = [
  {
    q: "What makes KNG Estate different?",
    a: "We combine deep market knowledge with genuine care for our clients. Transparency, honesty, and empowerment are at the heart of everything we do.",
  },
  {
    q: "How does KNG Estate ensure transparency?",
    a: "We provide detailed market reports, explain every fee, and keep you informed at every stage. No hidden costs, no surprises.",
  },
  {
    q: "Why shouldn't I wait for the market to cool?",
    a: "Timing the market perfectly is nearly impossible. Interest rates, inventory, and demand shift constantly. By working with us, you'll make a well-informed decision at the right time for your unique situation rather than trying to predict the unpredictable.",
  },
  {
    q: "How do you empower your clients?",
    a: "We educate you on market trends, pricing strategies, and negotiation tactics so you feel confident making the best decisions for your family or business.",
  },
  {
    q: "What areas do you serve?",
    a: "We primarily serve Surrey, Greater Vancouver, and the Fraser Valley region. Contact us to see if we cover your area.",
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="faq-item bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 opacity-0 translate-y-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-heading font-medium text-lg pr-4">{q}</span>
        <ChevronDown size={20} className={`shrink-0 transition-transform duration-300 text-gray-400 ${open ? "rotate-180" : ""}`} />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-6 pt-2">
            <p className="text-gray-500 leading-relaxed font-light">{a}</p>
        </div>
      </div>
    </div>
  );
};

const OurApproach = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".anim-text",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.2 }
    );
    
    tl.to(".faq-item",
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      "-=0.4"
    );

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-gray-50/50">
      <Header />
      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <span className="anim-text inline-block px-4 py-1.5 bg-white border border-gray-200 text-black text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
              Our Philosophy
            </span>
            <h1 className="anim-text text-4xl md:text-5xl font-heading font-medium mb-4">Our Approach</h1>
            <p className="anim-text text-muted-foreground text-lg max-w-xl mx-auto font-light">
              Transparency, communication, and client empowerment drive every decision we make.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OurApproach;

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Camera } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const points = [
  "Dedicated pricing strategy based on local absorption trends",
  "Premium listing presentation and buyer qualification",
  "End-to-end negotiation and closure support",
];

const SellPropertyPromo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".sell-promo-reveal",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section ref={sectionRef} className="relative bg-[#f4efe4] overflow-hidden">
      <div className="absolute -top-24 right-0 w-[360px] h-[360px] bg-[#c9a96e]/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-24">
        <div className="sell-promo-reveal border border-[#dccdaf] bg-white/90 p-8 md:p-12 lg:p-14 shadow-[0_18px_38px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="sell-promo-reveal inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#8f7442] mb-5">
                <span className="block w-8 h-[1px] bg-[#c9a96e]/60" />
                Seller Advisory
              </span>

              <h2 className="sell-promo-reveal text-4xl md:text-5xl lg:text-6xl font-heading font-medium leading-[1.05] text-gray-900">
                Ready to Sell?
                <br />
                <span className="italic font-light text-[#b8924f]">List with KNG</span>
              </h2>

              <p className="sell-promo-reveal mt-6 text-gray-700 text-sm md:text-[15px] leading-relaxed max-w-2xl">
                Share your property details and images in one step. Our team will review your listing,
                align valuation, and connect with a tailored sales strategy.
              </p>

              <div className="sell-promo-reveal mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/sell-property"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#c9a96e] to-[#b8924f] text-[#1f180d] text-xs md:text-sm tracking-[0.14em] uppercase font-bold hover:brightness-105 transition-all"
                >
                  Sell with KNG
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#d2c2a6] text-[#6f5a33] text-xs md:text-sm tracking-[0.14em] uppercase font-semibold hover:bg-white transition-colors"
                >
                  Talk to Advisor
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 sell-promo-reveal">
              <div className="border border-[#ddd1bc] bg-[#fcf9f3] p-6 md:p-8">
                <div className="inline-flex items-center gap-3 mb-5">
                  <div className="h-9 w-9 flex items-center justify-center bg-[#f1e4cd] text-[#8f7442]">
                    <Camera size={16} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8f7442] font-semibold">
                    What You Submit
                  </span>
                </div>

                <ul className="space-y-3">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#b8924f]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellPropertyPromo;

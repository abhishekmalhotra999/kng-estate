import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/shared/ServiceHero";
import SellPropertyForm from "@/components/shared/SellPropertyForm";
import heroImage from "@/assets/hero-home.jpg";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const processSteps = [
  "Submit your property details and images",
  "Receive valuation and positioning guidance",
  "Launch with curated marketing and buyer outreach",
  "Close with negotiation and documentation support",
];

const SellProperty = () => {
  const contentRef = useRef<HTMLElement>(null);
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
        ".sell-page-reveal",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 82%",
          },
        }
      );
    },
    { scope: contentRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <div className="min-h-screen bg-[#f8f5ee] text-gray-900">
      <Header />
      <main>
        <ServiceHero
          title="Sell Your Property"
          subtitle="Seller Advisory"
          description="List your property with confidence. Share your details and visuals, and our team will call you back with a clear strategy."
          image={heroImage}
          primaryCtaLabel="Submit Property"
          primaryCtaTo="/sell-property#sell-form"
          secondaryCtaLabel="Speak to Advisor"
          secondaryCtaTo="/contact"
        />

        <section id="sell-form" ref={contentRef} className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-20 bg-[#f4f0e8]">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
              <div className="lg:col-span-4 sell-page-reveal space-y-6 lg:sticky lg:top-28">
                <div>
                  <span className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#8f7442] mb-4">
                    <span className="block w-8 h-[1px] bg-[#c9a96e]/60" />
                    Why Sellers Choose KNG
                  </span>
                  <h2 className="text-3xl md:text-4xl font-heading font-medium leading-tight text-gray-900">
                    Precision,
                    <span className="italic font-light text-[#b8924f]"> Positioning, </span>
                    Performance
                  </h2>
                </div>

                <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
                  We combine market intelligence with execution discipline so your property is presented to the
                  right buyers at the right value.
                </p>

                <div className="border border-[#ddd1bc] bg-white p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={17} className="text-[#b8924f] mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Your information stays private and is only reviewed by our advisory desk.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#ece2d1]">
                    <a
                      href="tel:+919056465106"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#8f7442] hover:text-[#a88445] transition-colors"
                    >
                      Urgent Listing Assistance
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>

                <ul className="space-y-3">
                  {processSteps.map((step) => (
                    <li key={step} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#b8924f]" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-8 sell-page-reveal">
                <div className="relative bg-white border border-[#d8ccb7] p-6 md:p-8 lg:p-10 shadow-[0_14px_34px_rgba(0,0,0,0.05)]">
                  <div className="absolute top-0 left-0 w-16 h-[1px] bg-gradient-to-r from-[#c9a96e]/60 to-transparent" />
                  <div className="absolute top-0 left-0 h-16 w-[1px] bg-gradient-to-b from-[#c9a96e]/60 to-transparent" />

                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-heading font-light text-gray-900 mb-2">
                      Seller Submission
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Complete this form once and we will call you back to align valuation, timeline, and launch plan.
                    </p>
                  </div>

                  <SellPropertyForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SellProperty;

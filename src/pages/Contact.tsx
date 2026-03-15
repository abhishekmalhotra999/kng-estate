import { useEffect, useRef, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/shared/ContactForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const contactEssentials = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 90564 65106",
    secondary: "+1 236-258-5106",
    href: "tel:+919056465106",
  },
  {
    icon: Mail,
    label: "Email",
    value: "kngestate@gmail.com",
    secondary: null,
    href: "mailto:kngestate@gmail.com",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri: 9 AM – 6 PM",
    secondary: "Sat: 10 AM – 4 PM",
    href: null,
  },
];

const consultationJourney = [
  {
    step: "01",
    title: "Discovery Call",
    detail: "We understand your priorities, preferences, and investment profile.",
  },
  {
    step: "02",
    title: "Curated Shortlist",
    detail: "You receive handpicked opportunities aligned with your requirements.",
  },
  {
    step: "03",
    title: "Private Viewings & Closing",
    detail: "We coordinate viewings, negotiation, and final transaction support.",
  },
];

const Contact = () => {
  const container = useRef<HTMLDivElement>(null);
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

      // Hero content
      gsap.fromTo(
        ".ct-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.3 }
      );

      const words = gsap.utils.toArray(".ct-title-word") as HTMLElement[];
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

      gsap.fromTo(
        ".ct-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut", transformOrigin: "left", delay: 0.7 }
      );

      gsap.fromTo(
        ".ct-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.9 }
      );

      gsap.fromTo(
        ".ct-essential-card",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          delay: 1,
        }
      );

      // Form container
      gsap.fromTo(
        ".ct-form-container",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ct-form-container",
            start: "top 85%",
          },
        }
      );

      // Map
      gsap.fromTo(
        ".ct-map",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ct-map",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".ct-lower .ct-soft-reveal",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ct-lower",
            start: "top 82%",
          },
        }
      );
    },
    { scope: container, dependencies: [prefersReducedMotion] }
  );

  return (
    <div ref={container} className="min-h-screen bg-[#f8f5ee] text-gray-900">
      <Header />
      <main>
        {/* ─── Hero ─── */}
        <section
          className="relative pb-16 md:pb-20 px-6 md:px-12 lg:px-20 xl:px-28 overflow-hidden"
          style={{ paddingTop: "var(--kng-header-safe-offset, 9rem)" }}
        >
          <div className="absolute -top-16 -right-16 w-[540px] h-[540px] bg-[#c9a96e]/[0.045] blur-[160px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-black/[0.025] blur-[130px] rounded-full pointer-events-none" />

          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start max-w-7xl">
              <div className="lg:col-span-7 max-w-3xl pt-2">
                <span className="ct-eyebrow inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e]/85 mb-6">
                  <span className="block w-8 h-[1px] bg-[#c9a96e]/50" />
                  Contact Concierge
                </span>

                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-heading font-medium leading-[1.03] mb-8 text-gray-900/95"
                  style={{ perspective: "800px" }}
                >
                  {["Let's"].map((w, i) => (
                    <span key={i} className="ct-title-word inline-block mr-[0.25em]">
                      {w}
                    </span>
                  ))}
                  <span className="ct-title-word inline-block mr-[0.25em] italic font-light text-[#c9a96e]">
                    Start
                  </span>
                  <br />
                  {["a", "Conversation"].map((w, i) => (
                    <span key={i} className="ct-title-word inline-block mr-[0.25em] text-gray-600/80">
                      {w}
                    </span>
                  ))}
                </h1>

                <div className="ct-line w-16 h-[2px] bg-[#c9a96e] mb-8" />

                <p className="ct-desc text-lg text-gray-700/80 font-normal leading-relaxed max-w-xl">
                  Speak directly with our advisory team for residential,
                  rentals, commercial, or agricultural opportunities. Every inquiry is
                  treated with discretion and receives a personal response within 24 hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-8 max-w-4xl">
                  {contactEssentials.map((card) => {
                    const content = (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-9 h-9 flex items-center justify-center border border-[#c9a96e]/24 text-[#c9a96e]">
                            <card.icon size={16} strokeWidth={1.3} />
                          </div>
                          {card.href && <ArrowUpRight size={13} className="text-gray-500" />}
                        </div>

                        <span className="text-[9px] uppercase tracking-[0.25em] text-gray-700/70 mb-2 block">
                          {card.label}
                        </span>
                        <span className="font-heading text-base font-medium text-gray-900/92 block mb-1 leading-tight">
                          {card.value}
                        </span>
                        {card.secondary && (
                          <span className="text-xs text-gray-700/75 font-light block">
                            {card.secondary}
                          </span>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9a96e]/35" />
                      </>
                    );

                    return card.href ? (
                      <a
                        key={card.label}
                        href={card.href}
                        className="ct-essential-card relative p-5 border border-[#d9cfbd] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:border-[#c9a96e]/35 transition-colors"
                      >
                        {content}
                      </a>
                    ) : (
                      <div
                        key={card.label}
                        className="ct-essential-card relative p-5 border border-[#d9cfbd] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>

                <div className="ct-soft-reveal mt-8 inline-flex items-center gap-3 border border-[#d9cfbd] bg-white px-4 py-3 text-sm text-gray-800/80 shadow-[0_8px_22px_rgba(0,0,0,0.04)]">
                  <ShieldCheck size={16} className="text-[#c9a96e]" />
                  All conversations are private and handled by senior advisors.
                </div>
              </div>

              <div className="lg:col-span-5 w-full">
                <div className="ct-form-container relative p-8 md:p-10 border border-[#d6ccb9] bg-white backdrop-blur-sm shadow-[0_28px_70px_rgba(0,0,0,0.1)]">
                  <div className="absolute top-0 left-0 w-16 h-[1px] bg-[#c9a96e]/60" />
                  <div className="absolute top-0 left-0 h-16 w-[1px] bg-[#c9a96e]/60" />

                  <div className="mb-8">
                    <span className="inline-flex px-3 py-1 border border-[#c9a96e]/30 text-[10px] tracking-[0.25em] uppercase text-[#8f7442]/80 mb-4">
                      Priority Desk
                    </span>
                    <h2 className="text-2xl md:text-3xl font-heading font-medium mb-2 text-gray-900/95">
                      Private Inquiry
                    </h2>
                    <p className="text-sm text-gray-700/80 font-normal">
                      Share your requirements and our team will reach out with a tailored response.
                    </p>
                  </div>
                  <ContactForm showLabels />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Journey + Location ─── */}
        <section className="ct-lower bg-[#f4f1e9] px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-24">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10">
              <div className="ct-map ct-soft-reveal lg:col-span-7 p-8 md:p-10 border border-[#d9cfbd] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#c9a96e]/20 text-[#c9a96e]/80">
                    <MapPin size={18} strokeWidth={1.2} />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-gray-700/70 block">
                      Head Office
                    </span>
                    <span className="font-heading font-medium text-gray-900/92 block">
                      Panchkula
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-700/80 leading-relaxed mb-6 max-w-md">
                  B-9, Ansals Sampark-1, SCO-194-195
                  <br />
                  City Centre, Sector-5, Panchkula — 134109
                </p>

                <div className="aspect-[16/9] bg-black/[0.03] border border-black/[0.05] overflow-hidden min-h-[240px]">
                  <iframe
                    title="KNG Estate Office"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.2!2d76.86!3d30.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f93!2sPanchkula!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                    className="w-full h-full opacity-70 hover:opacity-100 transition-opacity duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <div className="ct-journey lg:col-span-5 space-y-5">
                <a
                  href="https://wa.me/919056465106"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-soft-reveal group flex items-center gap-5 p-6 md:p-7 bg-[#eaf9ef] border border-[#25D366]/25 hover:bg-[#ddf6e6] hover:border-[#25D366]/45 transition-all duration-500 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                >
                  <div className="w-11 h-11 flex items-center justify-center bg-[#25D366] text-gray-900 rounded-full shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-[#25D366]/55 block mb-1">
                      Instant Connect
                    </span>
                    <span className="font-heading text-lg font-medium text-gray-900/92">
                      Message us on WhatsApp
                    </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-gray-500 group-hover:text-[#25D366] transition-colors shrink-0"
                  />
                </a>

                <div className="ct-soft-reveal border border-[#d9cfbd] bg-white p-6 md:p-7 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#8f7442]/80 block mb-4">
                    Consultation Journey
                  </span>
                  <div className="space-y-4">
                    {consultationJourney.map((item) => (
                      <div key={item.step} className="grid grid-cols-[42px_1fr] gap-4 items-start">
                        <span className="font-heading text-lg text-[#c9a96e] leading-none mt-0.5">
                          {item.step}
                        </span>
                        <div>
                          <h3 className="font-heading text-base text-gray-900/92 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-700/80 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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

export default Contact;

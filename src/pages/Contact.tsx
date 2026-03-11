import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/shared/ContactForm";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, MessageCircle } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const contactCards = [
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

const Contact = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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

      // Contact cards — scroll scrub
      const cards = gsap.utils.toArray(".ct-card") as HTMLElement[];
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 70%",
              scrub: 1,
            },
          }
        );
      });

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
    },
    { scope: container }
  );

  return (
    <div ref={container} className="min-h-screen bg-[#FCFBF8] text-gray-900">
      <Header />
      <main>
        {/* ─── Hero ─── */}
        <section className="relative pt-36 md:pt-44 pb-16 md:pb-24 px-6 md:px-12 lg:px-20 xl:px-28 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a96e]/[0.03] blur-[150px] rounded-full pointer-events-none" />

          <div className="container mx-auto">
            <div className="max-w-3xl">
              <span className="ct-eyebrow inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e] mb-6">
                <span className="block w-8 h-[1px] bg-[#c9a96e]/50" />
                Contact
              </span>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-medium leading-[1.05] mb-8"
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
                  <span key={i} className="ct-title-word inline-block mr-[0.25em] text-gray-600">
                    {w}
                  </span>
                ))}
              </h1>

              <div className="ct-line w-16 h-[2px] bg-[#c9a96e] mb-8" />

              <p className="ct-desc text-lg text-gray-600 font-light leading-relaxed max-w-xl">
                Ready to start your real estate journey? We'd love to hear from
                you. Reach out through any channel below — every message gets a
                personal response within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Contact Cards Row ─── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
              {contactCards.map((card) => (
                <a
                  key={card.label}
                  href={card.href || undefined}
                  className="ct-card group relative p-6 md:p-8 border border-black/[0.05] bg-black/[0.02] hover:border-[#c9a96e]/20 hover:bg-black/[0.03] transition-all duration-700 block"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 flex items-center justify-center border border-[#c9a96e]/20 text-[#c9a96e]/80 group-hover:text-[#c9a96e] group-hover:border-[#c9a96e]/40 transition-all duration-500">
                      <card.icon size={18} strokeWidth={1.2} />
                    </div>
                    {card.href && (
                      <ArrowUpRight
                        size={14}
                        className="text-gray-500 group-hover:text-[#c9a96e] transition-colors duration-500"
                      />
                    )}
                  </div>

                  <span className="text-[9px] uppercase tracking-[0.25em] text-gray-600 mb-2 block">
                    {card.label}
                  </span>
                  <span className="font-heading text-base md:text-lg font-medium text-gray-900 block mb-1">
                    {card.value}
                  </span>
                  {card.secondary && (
                    <span className="text-xs text-gray-600 font-light block">
                      {card.secondary}
                    </span>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9a96e]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WhatsApp Banner ─── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16">
          <div className="container mx-auto max-w-4xl">
            <a
              href="https://wa.me/919056465106"
              target="_blank"
              rel="noopener noreferrer"
              className="ct-card group flex items-center gap-5 p-6 md:p-8 bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/15 hover:border-[#25D366]/40 transition-all duration-500"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[#25D366] text-gray-900 rounded-full shrink-0">
                <MessageCircle size={22} />
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#25D366]/60 block mb-1">
                  Instant Connect
                </span>
                <span className="font-heading text-lg font-medium text-gray-900">
                  Message us on WhatsApp
                </span>
              </div>
              <ArrowUpRight
                size={16}
                className="text-gray-500 group-hover:text-[#25D366] transition-colors shrink-0"
              />
            </a>
          </div>
        </section>

        {/* ─── Form + Map ─── */}
        <section className="bg-white px-6 md:px-12 lg:px-20 xl:px-28 py-32">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
              {/* Form */}
              <div className="ct-form-container relative p-8 md:p-12 border border-black/[0.05] bg-black/[0.02]">
                <div className="absolute top-0 left-0 w-12 h-[1px] bg-[#c9a96e]/40" />
                <div className="absolute top-0 left-0 h-12 w-[1px] bg-[#c9a96e]/40" />

                <h2 className="text-2xl md:text-3xl font-heading font-medium mb-2">
                  Private Inquiry
                </h2>
                <p className="text-sm text-gray-600 font-light mb-8">
                  Every message receives a response within 24 hours.
                </p>
                <ContactForm />
              </div>

              {/* Address + Map */}
              <div className="space-y-6">
                <div className="ct-map p-8 md:p-10 border border-black/[0.05] bg-black/[0.02]">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-10 h-10 flex items-center justify-center border border-[#c9a96e]/20 text-[#c9a96e]/80">
                      <MapPin size={18} strokeWidth={1.2} />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.25em] text-gray-600 block">
                        Head Office
                      </span>
                      <span className="font-heading font-medium text-gray-900 block">
                        Panchkula
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-light leading-relaxed mb-6">
                    B-9, Ansals Sampark-1, SCO-194-195
                    <br />
                    City Centre, Sector-5, Panchkula — 134109
                  </p>
                  <div className="aspect-[16/9] bg-black/[0.03] border border-black/[0.05] overflow-hidden">
                    <iframe
                      title="KNG Estate Office"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.2!2d76.86!3d30.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f93!2sPanchkula!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                      className="w-full h-full opacity-70 hover:opacity-100 transition-opacity duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
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

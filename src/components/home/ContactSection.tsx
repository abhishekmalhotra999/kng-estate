import { useRef } from "react";
import { MessageCircle, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const ContactSection = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Horizontal gold line draws in
      gsap.fromTo(
        ".contact-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
        }
      );

      // Stagger left-column items
      gsap.fromTo(
        ".contact-fade",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
          },
        }
      );

      // Form slides in
      gsap.fromTo(
        ".contact-form-reveal",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form-reveal",
            start: "top 85%",
          },
        }
      );
    },
    { scope: container }
  );

  const handleWhatsApp = () => {
    window.open("https://wa.me/919056465106", "_blank");
  };

  return (
    <section
      ref={container}
      id="contact-section"
      className="relative bg-[#f8f5ee] text-gray-900 overflow-hidden"
    >
      {/* ─── Ambient glow ─── */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c9a96e]/[0.04] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c9a96e]/[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* ─── Top edge line ─── */}
      <div className="contact-line h-[1px] bg-gradient-to-r from-[#c9a96e]/60 via-[#c9a96e]/20 to-transparent" />

      {/* ─── Main content ─── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-24 md:py-32 relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-20">
          <div>
            <span className="contact-fade inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e]/85 mb-5">
              <span className="block w-8 h-[1px] bg-[#c9a96e]/50" />
              Contact
            </span>
            <h2 className="contact-fade text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-medium leading-[1] text-gray-900/95">
              Start Your
              <br />
              <span className="italic font-light text-[#c9a96e]">
                Journey
              </span>{" "}
              With Us
            </h2>
          </div>

          <p className="contact-fade font-body text-gray-700/80 text-sm md:text-[15px] max-w-sm leading-[1.8] tracking-wide">
            From first inquiry to final handshake — we are with you. Experience
            the KNG difference.
          </p>
        </div>

        {/* ─── Two-column layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          {/* ─── Left: Contact Info Cards ─── */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick connect cards */}
            <div className="contact-fade grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone card */}
              <a
                href="tel:+919056465106"
                className="group relative p-6 border border-[#d9cfbd] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.07)] hover:border-[#c9a96e]/30 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 flex items-center justify-center border border-[#c9a96e]/30 text-[#c9a96e]">
                    <Phone size={15} strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="ml-auto text-gray-500 group-hover:text-[#c9a96e] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
                  />
                </div>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-gray-700/70 mb-1.5">
                  Call Us
                </span>
                <p className="font-heading text-base text-gray-900/92 leading-tight">
                  +91 90564 65106
                </p>
                <p className="text-xs text-gray-700/80 mt-1">+1 236-258-5106</p>
              </a>

              {/* Email card */}
              <a
                href="mailto:kngestate@gmail.com"
                className="group relative p-6 border border-[#d9cfbd] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.07)] hover:border-[#c9a96e]/30 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 flex items-center justify-center border border-[#c9a96e]/30 text-[#c9a96e]">
                    <Mail size={15} strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="ml-auto text-gray-500 group-hover:text-[#c9a96e] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
                  />
                </div>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-gray-700/70 mb-1.5">
                  Email
                </span>
                <p className="font-heading text-base text-gray-900/92 leading-tight">
                  kngestate@gmail.com
                </p>
              </a>
            </div>

            {/* WhatsApp CTA */}
            <button
              onClick={handleWhatsApp}
              className="contact-fade group w-full flex items-center gap-4 p-5 border border-[#25D366]/15 bg-[#25D366]/[0.04] hover:bg-[#25D366]/10 hover:border-[#25D366]/30 transition-all duration-500"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                <MessageCircle size={18} />
              </div>
              <div className="text-left">
                <span className="block text-xs font-semibold text-[#25D366] tracking-wide uppercase">
                  WhatsApp
                </span>
                <span className="block text-[11px] text-gray-700/75 mt-0.5">
                  Get an instant reply
                </span>
              </div>
              <ArrowUpRight
                size={16}
                className="ml-auto text-[#25D366]/40 group-hover:text-[#25D366] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
              />
            </button>

            {/* Office address */}
            <div className="contact-fade p-6 border border-[#d9cfbd] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 flex items-center justify-center border border-[#c9a96e]/30 text-[#c9a96e]">
                  <MapPin size={15} strokeWidth={1.5} />
                </div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-gray-700/70">
                  Head Office
                </span>
              </div>
              <p className="text-sm text-gray-700/80 leading-relaxed mb-5">
                B-9, Ansals Sampark-1, SCO-194-195
                <br />
                City Centre, Sector-5, Panchkula — 134109
              </p>
              <div className="w-full h-40 overflow-hidden relative border border-black/[0.05] grayscale hover:grayscale-0 transition-all duration-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15640.835474751336!2d76.83783935210963!3d30.697841577717466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f936555555555%3A0x1234567890abcdef!2sSector%205%2C%20Panchkula%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* ─── Right: Contact Form ─── */}
          <div className="lg:col-span-7 contact-form-reveal">
            <div className="relative p-8 md:p-12 lg:p-14 bg-white border border-[#d9cfbd] shadow-[0_14px_34px_rgba(0,0,0,0.05)]">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-[1px] bg-gradient-to-r from-[#c9a96e]/50 to-transparent" />
              <div className="absolute top-0 left-0 h-16 w-[1px] bg-gradient-to-b from-[#c9a96e]/50 to-transparent" />
              <div className="absolute bottom-0 right-0 w-16 h-[1px] bg-gradient-to-l from-[#c9a96e]/50 to-transparent" />
              <div className="absolute bottom-0 right-0 h-16 w-[1px] bg-gradient-to-t from-[#c9a96e]/50 to-transparent" />

              {/* Form header */}
              <div className="mb-10">
                <h3 className="text-2xl md:text-3xl font-heading font-light text-gray-900/95 mb-2">
                  Private Inquiry
                </h3>
                <p className="text-gray-700/75 text-sm font-normal">
                  Every message receives a response within 24 hours.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

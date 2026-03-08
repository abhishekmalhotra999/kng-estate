import { useRef } from "react";
import { MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const ContactSection = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".contact-intro",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(".contact-detail",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(".contact-form-wrapper",
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

  }, { scope: container });

  const handleWhatsApp = () => {
    window.open("https://wa.me/919056465106", "_blank");
  };

  return (
    <section ref={container} className="bg-[#0a0a0a] text-white overflow-hidden relative">

      {/* Radial gold glow top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Section header bar */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">Get In Touch</span>
          <button
            onClick={handleWhatsApp}
            className="group inline-flex items-center gap-3 px-6 py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-bold tracking-widest uppercase hover:bg-[#25D366] hover:text-white transition-all duration-300"
          >
            <MessageCircle size={16} />
            Instant Reply — WhatsApp
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left Column */}
          <div className="lg:col-span-5 space-y-14">
            <div className="contact-intro">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium leading-[0.95] mb-8">
                Let's Build <br />
                <em className="italic font-serif font-light text-primary">Something</em><br />
                Together.
              </h2>
              <p className="text-lg text-white/50 font-light leading-relaxed max-w-sm">
                From first inquiry to final handshake, we are with you. Reach out and experience the KNG difference.
              </p>
            </div>

            {/* Contact details as an editorial list */}
            <div className="space-y-0 divide-y divide-white/8">
              <div className="contact-detail group py-7 flex gap-6 items-center cursor-pointer hover:pl-2 transition-all duration-300">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center text-primary">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/30 mb-1">Phone</span>
                  <p className="text-lg text-white font-heading leading-tight">+91 90564 65106</p>
                  <p className="text-sm text-white/40 mt-0.5">+1 236-258-5106</p>
                </div>
              </div>

              <div className="contact-detail group py-7 flex gap-6 items-center cursor-pointer hover:pl-2 transition-all duration-300">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center text-primary">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-white/30 mb-1">Email</span>
                  <p className="text-lg text-white font-heading">kngestate@gmail.com</p>
                </div>
              </div>

              <div className="contact-detail py-7 flex gap-6 items-start">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center text-primary mt-1">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
                <div className="w-full">
                  <span className="block text-[10px] uppercase tracking-widest text-white/30 mb-2">Office</span>
                  <p className="text-base text-white/70 font-light leading-relaxed mb-6">
                    B-9, Ansals Sampark-1, SCO-194-195<br />
                    City Centre, Sector-5, Panchkula — 134109
                  </p>
                  <div className="w-full h-44 overflow-hidden relative border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15640.835474751336!2d76.83783935210963!3d30.697841577717466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f936555555555%3A0x1234567890abcdef!2sSector%205%2C%20Panchkula%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                      width="100%" height="100%" style={{ border: 0 }}
                      allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 contact-form-wrapper">
            <div className="relative border border-white/10 p-8 md:p-12">
              {/* Glowing top-right corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-l from-primary/60 to-transparent" />
              <div className="absolute top-0 right-0 h-20 w-[1px] bg-gradient-to-b from-primary/60 to-transparent" />
              <div className="absolute bottom-0 left-0 w-20 h-[1px] bg-gradient-to-r from-primary/60 to-transparent" />
              <div className="absolute bottom-0 left-0 h-20 w-[1px] bg-gradient-to-t from-primary/60 to-transparent" />

              <h3 className="text-2xl font-heading font-light text-white mb-2">Send a Private Inquiry</h3>
              <p className="text-white/40 text-sm mb-10 font-light">We respond to every message within 24 hours.</p>
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;

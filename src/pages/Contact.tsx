import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/shared/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const Contact = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".contact-header-item",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.2 }
    );
    
    tl.fromTo(".contact-info-card",
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      "-=0.4"
    );

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="contact-header-item text-4xl md:text-5xl font-heading font-medium mb-4">Get in Touch</h1>
            <p className="contact-header-item text-muted-foreground text-lg max-w-2xl mx-auto font-light">
              Ready to start your real estate journey? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-3 bg-white p-8 md:p-12 shadow-xl border border-gray-100">
              <ContactForm />
            </div>

            <div className="lg:col-span-2 space-y-6">
              {[
                { icon: MapPin, label: "Address", value: "B-9, Ansals Sampark-1\nSCO-194-195, City Centre\nSector-5, Panchkula\nHaryana – 134109" },
                { icon: Phone, label: "Phone", value: "+91 90564 65106\n+1 236-258-5106" },
                { icon: Mail, label: "Email", value: "kngestate@gmail.com" },
                { icon: Clock, label: "Hours", value: "Mon–Fri: 9 AM – 6 PM\nSat: 10 AM – 4 PM" },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="contact-info-card bg-gray-50 p-8 border border-gray-100 flex items-start gap-5 hover:border-black/20 transition-all duration-300 opacity-0"
                >
                  <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 text-black">
                    <item.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium mb-1 text-lg">{item.label}</h3>
                    <p className="text-sm text-gray-500 whitespace-pre-line font-light leading-relaxed">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

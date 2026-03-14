import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

type ContactFormProps = {
  showLabels?: boolean;
};

const ContactForm = ({ showLabels = false }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    interest: "",
    city: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    },
    { scope: formRef, dependencies: [prefersReducedMotion] }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll be in touch soon.");
    console.log(formData);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      interest: "",
      city: "",
      message: "",
    });
  };

  const inputClass =
    "input-field w-full px-5 py-3.5 bg-white/85 border border-black/[0.1] text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-[#c9a96e]/50 focus:bg-white transition-all duration-300 font-light text-sm";
  const labelClass = "mb-2 block text-[11px] uppercase tracking-[0.16em] text-gray-600";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          {showLabels && <label htmlFor="contact-first-name" className={labelClass}>First Name</label>}
          <input
            id="contact-first-name"
            type="text"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className={inputClass}
          />
        </div>
        <div>
          {showLabels && <label htmlFor="contact-last-name" className={labelClass}>Last Name</label>}
          <input
            id="contact-last-name"
            type="text"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className={inputClass}
          />
        </div>
        <div>
          {showLabels && <label htmlFor="contact-phone" className={labelClass}>Phone Number</label>}
          <input
            id="contact-phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          {showLabels && <label htmlFor="contact-email" className={labelClass}>Email Address</label>}
          <input
            id="contact-email"
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="relative">
          {showLabels && <label htmlFor="contact-interest" className={labelClass}>Real Estate Interest</label>}
          <select
            id="contact-interest"
            value={formData.interest}
            onChange={(e) =>
              setFormData({ ...formData, interest: e.target.value })
            }
            className={`${inputClass} appearance-none cursor-pointer`}
            required
          >
            <option value="" className="bg-white text-gray-600">
              Real Estate Interest
            </option>
            <option value="residential" className="bg-white text-gray-900">
              Residential
            </option>
            <option value="commercial" className="bg-white text-gray-900">
              Commercial
            </option>
            <option value="agricultural" className="bg-white text-gray-900">
              Agricultural
            </option>
          </select>
        </div>

        <div>
          {showLabels && <label htmlFor="contact-city" className={labelClass}>City</label>}
          <input
            id="contact-city"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>
      <div className="mt-4">
        {showLabels && <label htmlFor="contact-message" className={labelClass}>Your Message</label>}
        <textarea
          id="contact-message"
          placeholder="How can we help you?"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="mt-6 w-full group relative flex items-center justify-center gap-3 px-8 py-4 bg-[#c9a96e] text-[#141108] text-xs font-bold uppercase tracking-[0.18em] border border-[#b8924f] hover:bg-[#d2b57d] transition-all duration-500 active:scale-[0.99] shadow-[0_10px_24px_rgba(201,169,110,0.22)]"
      >
        <span className="relative z-10">Send Message</span>
        <Send
          size={14}
          className="relative z-10 transition-transform group-hover:translate-x-1"
        />
      </button>
    </form>
  );
};

export default ContactForm;

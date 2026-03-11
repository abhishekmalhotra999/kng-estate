import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const ContactForm = () => {
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

  useGSAP(
    () => {
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
    { scope: formRef }
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
    "input-field w-full px-5 py-4 bg-black/[0.015] border border-black/[0.08] text-gray-900 placeholder:text-gray-600 focus:outline-none focus:border-[#c9a96e]/40 transition-all duration-300 font-light text-sm";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="w-full opacity-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          required
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          className={inputClass}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClass}
        />
        <div className="relative">
          <select
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

        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className={inputClass}
        />
      </div>
      <textarea
        placeholder="How can we help you?"
        rows={4}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className={`${inputClass} mt-4 resize-none`}
      />
      <button
        type="submit"
        className="mt-6 w-full group relative flex items-center justify-center gap-3 px-8 py-4 bg-[#c9a96e] text-[#141108] text-xs font-bold uppercase tracking-[0.15em] hover:bg-white transition-all duration-500 active:scale-[0.99] overflow-hidden"
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

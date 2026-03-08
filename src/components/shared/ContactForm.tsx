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

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
     // Optional: animate inputs inside if we want more flair
     // .fromTo(".input-field", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, "-=0.4")

  }, { scope: formRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll be in touch soon.");
    // In a real app, you would send this data to a backend
    console.log(formData);
    setFormData({ firstName: "", lastName: "", phone: "", email: "", interest: "", city: "", message: "" });
  };

  const inputClass =
    "input-field w-full px-6 py-4 bg-gray-50 border border-gray-200 text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300 font-light text-sm";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full opacity-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input
          type="text"
          placeholder="First Name"
          required
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
              className={`${inputClass} appearance-none`}
              required
            >
              <option value="" className="text-gray-400">Real Estate Interest</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="agricultural">Agricultural</option>
            </select>
             {/* Custom arrow could go here */}
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
        className={`${inputClass} mt-5 resize-none`}
      />
      <button
        type="submit"
        className="mt-8 w-full group relative flex items-center justify-center gap-3 px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-all active:scale-[0.99] overflow-hidden"
      >
        <span className="relative z-10">Send Message</span>
        <Send size={14} className="relative z-10 transition-transform group-hover:translate-x-1" />
        <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      </button>
    </form>
  );
};

export default ContactForm;


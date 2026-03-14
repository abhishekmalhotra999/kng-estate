import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  Send,
} from "lucide-react";
import logo from "@/assets/kng-logo.webp";

const Footer = () => {
  const [subscriberEmail, setSubscriberEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subscriberEmail.trim()) return;

    const subject = encodeURIComponent("Market Letter Subscription Request");
    const body = encodeURIComponent(`Please subscribe this email to the KNG Market Letter:\n\n${subscriberEmail.trim()}`);
    window.location.href = `mailto:kngestate@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="relative overflow-hidden bg-white text-gray-900 border-t border-[#ddcfb6]">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#c9a96e]/20 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#b8924f]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* ─── Premium Newsletter Band ─── */}
      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 xl:px-28 pt-14 md:pt-16">
        <div className="border border-[#d8c7aa] bg-[#f8f2e6] px-6 md:px-10 lg:px-12 py-8 md:py-10 shadow-[0_14px_40px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-end gap-8">
            <div>
              <span className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#8f7442] mb-4">
                <span className="block w-8 h-[1px] bg-[#c9a96e]/60" />
                Market Letter
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-[2.1rem] font-heading font-medium leading-tight text-gray-900">
                Exceptional Insights, <span className="italic font-light text-[#b8924f]">Delivered Monthly</span>
              </h3>
              <p className="text-gray-700 text-sm md:text-[15px] mt-3 leading-relaxed max-w-xl">
                Get premium listing updates, Tricity market intelligence, and advisory perspectives from the KNG team.
              </p>
            </div>

            <form className="flex flex-col sm:flex-row w-full gap-3 sm:gap-0" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                className="flex-1 px-5 md:px-6 py-4 bg-white border border-[#d7c9b1] sm:border-r-0 text-gray-900 text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#c9a96e]/50 transition-colors min-h-[50px]"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-[#c9a96e] to-[#b8924f] text-[#1f180d] text-xs font-bold tracking-[0.16em] uppercase hover:brightness-105 transition-all duration-300 flex items-center justify-center gap-2 shrink-0 min-h-[50px]"
              >
                <Send size={14} />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ─── Main Footer Grid ─── */}
      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 rounded-[2px] bg-[#fcfaf5] border border-[#e6dbc8] px-6 py-8 md:px-8 md:py-10">
          {/* Brand Block */}
          <div className="lg:col-span-4">
            <img
              src={logo}
              alt="KNG Estate"
              className="h-12 w-auto mb-5"
              width={180}
              height={48}
              decoding="async"
            />
            <p className="text-[15px] text-gray-700 leading-relaxed max-w-xs mb-6">
              Premier real estate advisory for Tricity. We combine trust, market depth, and white-glove execution.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-semibold text-[#8f7442] hover:text-[#a88445] transition-colors"
            >
              Book Consultation
              <ArrowUpRight size={12} />
            </Link>

            <div className="flex gap-2 mt-6">
              {[
                { icon: MessageCircle, href: "https://wa.me/919056465106", label: "WhatsApp" },
                { icon: Phone, href: "tel:+919056465106", label: "Call" },
                { icon: Mail, href: "mailto:kngestate@gmail.com", label: "Email" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  title={s.label}
                  className="h-10 w-10 flex items-center justify-center border border-[#d9cdb8] text-gray-700 hover:text-[#8f7442] hover:border-[#b8924f]/50 hover:bg-white transition-all duration-300"
                >
                  <s.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8f7442] mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Residential", path: "/residential" },
                { label: "Rentals", path: "/rentals" },
                { label: "Commercial", path: "/commercial" },
                { label: "Agricultural", path: "/agricultural" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-sm text-gray-700 hover:text-[#a88445] transition-colors duration-300"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={10}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8f7442] mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Our Team", path: "/team" },
                { label: "Our Approach", path: "/approach" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-sm text-gray-700 hover:text-[#a88445] transition-colors duration-300"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={10}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8f7442] mb-5">
              Concierge Desk
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-1 shrink-0 text-[#b8924f]" />
                <span className="text-sm text-gray-700 leading-relaxed">
                  B-9, Ansals Sampark-1, SCO-194-195
                  <br />
                  City Centre, Sector-5, Panchkula — 134109
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="shrink-0 text-[#b8924f]" />
                <span className="text-sm text-gray-700">
                  +91 90564 65106 &middot; +1 236-258-5106
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="shrink-0 text-[#b8924f]" />
                <span className="text-sm text-gray-700">kngestate@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="relative z-10 border-t border-[#d8ccb7] bg-[#f6efe1]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-5 flex items-center justify-center">
          <p className="text-[11px] text-gray-600 tracking-wide">
            © {new Date().getFullYear()} KNG Estate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  ArrowUpRight,
  Send,
} from "lucide-react";
import logo from "@/assets/kng-logo.webp";

const Footer = () => {
  return (
    <footer className="bg-[#FCFBF8] text-gray-900 border-t border-black/[0.05]">
      {/* ─── Newsletter ─── */}
      <div className="border-b border-black/[0.05]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
            <div>
              <span className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e] mb-4">
                <span className="block w-8 h-[1px] bg-[#c9a96e]/50" />
                Newsletter
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-medium leading-tight">
                Stay <span className="italic font-light text-[#c9a96e]">Informed</span>
              </h3>
              <p className="text-gray-600 text-sm font-light mt-2 max-w-sm">
                Market insights, exclusive listings, and expert advice — delivered to your inbox.
              </p>
            </div>
            <form className="flex w-full lg:w-auto gap-0" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 lg:w-80 px-6 py-4 bg-black/[0.03] border border-black/[0.08] border-r-0 text-gray-900 text-sm font-light placeholder:text-gray-500 focus:outline-none focus:border-[#c9a96e]/30 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#c9a96e] text-[#141108] text-xs font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors duration-500 flex items-center gap-2 shrink-0"
              >
                <Send size={14} />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ─── Main Footer Grid ─── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Logo + Tagline */}
          <div className="lg:col-span-4">
            <img
              src={logo}
              alt="KNG Estate"
              className="h-12 w-auto mb-5 brightness-0 opacity-90"
            />
            <p className="text-sm text-gray-600 leading-relaxed font-light max-w-xs mb-6">
              Your friends in the real estate world. We care, that's why we
              share — since 2004.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Linkedin, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="h-10 w-10 flex items-center justify-center border border-black/[0.08] text-gray-600 hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all duration-500"
                >
                  <s.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Residential", path: "/residential" },
                { label: "Commercial", path: "/commercial" },
                { label: "Agricultural", path: "/agricultural" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#c9a96e] transition-colors duration-300 font-light"
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
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Our Team", path: "/team" },
                { label: "Our Approach", path: "/approach" },
                { label: "Journal", path: "/blogs" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#c9a96e] transition-colors duration-300 font-light"
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

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600 mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={14}
                  className="mt-1 shrink-0 text-[#c9a96e]/40"
                />
                <span className="text-sm text-gray-600 font-light leading-relaxed">
                  B-9, Ansals Sampark-1, SCO-194-195
                  <br />
                  City Centre, Sector-5, Panchkula — 134109
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  size={14}
                  className="shrink-0 text-[#c9a96e]/40"
                />
                <span className="text-sm text-gray-600 font-light">
                  +91 90564 65106 &middot; +1 236-258-5106
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  size={14}
                  className="shrink-0 text-[#c9a96e]/40"
                />
                <span className="text-sm text-gray-600 font-light">
                  kngestate@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="border-t border-black/[0.04]">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-gray-500 font-light tracking-wide">
            © {new Date().getFullYear()} KNG Estate. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-900/15 font-light tracking-wide">
            Brokered by{" "}
            <span className="text-gray-500">Woodhouse Realty</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/kng-logo.webp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navItems = [
  { label: "Home", path: "/" },
  {
    label: "Our Services",
    children: [
      { label: "Residential", path: "/residential" },
      { label: "Commercial", path: "/commercial" },
      { label: "Agricultural", path: "/agricultural" },
    ],
  },
  {
    label: "Team & Strategy",
    children: [
      { label: "Our Team", path: "/team" },
      { label: "Our Approach", path: "/approach" },
    ],
  },
  { label: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animation for Mobile Menu
  useGSAP(() => {
    if (mobileOpen) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        display: "block"
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        display: "none"
      });
    }
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none py-4`}
    >
      <div
        className={`pointer-events-auto relative mx-4 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${isScrolled
          ? "glass border border-black/10 shadow-xl w-full max-w-5xl bg-white/90 backdrop-blur-md text-black"
          : "bg-transparent w-full max-w-7xl border border-transparent text-gray-900"
          }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="KNG Estate"
            className="h-8 w-auto"
          />
        </Link>


        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)} // Keep state for consistency if needed, but CSS handles hover
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-full group-hover:bg-black/5 ${isScrolled
                    ? "text-black/80 hover:text-black hover:bg-black/5"
                    : "text-gray-900/90 hover:text-gray-900"
                    }`}
                >
                  {item.label}
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 pt-6 min-w-[220px] 
                  opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50`}
                >
                  <div className="absolute top-0 left-0 w-full h-8 bg-transparent" />
                  <div className="bg-white rounded-2xl shadow-xl border border-black/5 p-2 relative">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors font-medium"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path!}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${location.pathname === item.path
                  ? isScrolled
                    ? "bg-black/5 text-gray-900"
                    : "bg-black/5 text-black"
                  : isScrolled
                    ? "text-black/80 hover:text-black hover:bg-black/5"
                    : "text-gray-900/90 hover:text-gray-900 hover:bg-black/5"
                  }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-full transition-colors ${isScrolled ? "hover:bg-black/5 text-black" : "hover:bg-black/10 text-gray-900"
            }`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="hidden absolute top-[calc(100%-10px)] left-4 right-4 pointer-events-auto lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl border border-black/10 shadow-2xl z-[60]"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-6 py-6 space-y-2">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-bold text-black rounded-xl hover:bg-gray-50"
                >
                  {item.label}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === item.label ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 space-y-1 ${openDropdown === item.label ? "max-h-48 opacity-100 py-2" : "max-h-0 opacity-0"
                    }`}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-500 hover:text-black rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path!}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-bold text-black hover:text-black/70 rounded-xl hover:bg-gray-50 border-b border-gray-100 last:border-0"
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

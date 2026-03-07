import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import logo from "@/assets/kng-logo.webp";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-6 py-12 text-center">
          <h3 className="text-2xl font-heading font-bold mb-2">Stay Updated!</h3>
          <p className="text-background/60 mb-6">Subscribe to hear from us.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <img src={logo} alt="KNG Estate" className="h-14 w-auto mb-4" />
            <p className="text-sm text-background/60 leading-relaxed">
              Your friends in the real estate world. We care, that's why we share.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link to="/residential" className="hover:text-background transition-colors">Residential</Link></li>
              <li><Link to="/commercial" className="hover:text-background transition-colors">Commercial</Link></li>
              <li><Link to="/agricultural" className="hover:text-background transition-colors">Agricultural</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/60">
              <li><Link to="/team" className="hover:text-background transition-colors">Our Team</Link></li>
              <li><Link to="/approach" className="hover:text-background transition-colors">Our Approach</Link></li>
              <li><Link to="/blogs" className="hover:text-background transition-colors">Blogs</Link></li>
              <li><Link to="/contact" className="hover:text-background transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                B-9, Ansals Sampark-1, SCO-194-195, City Centre, Sector-5, Panchkula, Haryana – 134109
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                <span>+91 90564 65106 / +1 236-258-5106</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                kngestate@gmail.com
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center text-sm text-background/40">
          <p>Brokered by: <strong className="text-background/60">Woodhouse Realty</strong></p>
          <p className="mt-1">© {new Date().getFullYear()} KNG Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

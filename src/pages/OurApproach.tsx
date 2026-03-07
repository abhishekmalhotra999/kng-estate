import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What makes KNG Estate different?",
    a: "We combine deep market knowledge with genuine care for our clients. Transparency, honesty, and empowerment are at the heart of everything we do.",
  },
  {
    q: "How does KNG Estate ensure transparency?",
    a: "We provide detailed market reports, explain every fee, and keep you informed at every stage. No hidden costs, no surprises.",
  },
  {
    q: "Why shouldn't I wait for the market to cool?",
    a: "Timing the market perfectly is nearly impossible. Interest rates, inventory, and demand shift constantly. By working with us, you'll make a well-informed decision at the right time for your unique situation rather than trying to predict the unpredictable.",
  },
  {
    q: "How do you empower your clients?",
    a: "We educate you on market trends, pricing strategies, and negotiation tactics so you feel confident making the best decisions for your family or business.",
  },
  {
    q: "What areas do you serve?",
    a: "We primarily serve Surrey, Greater Vancouver, and the Fraser Valley region. Contact us to see if we cover your area.",
  },
];

const FAQItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-card rounded-4xl border border-border/50 overflow-hidden shadow-premium"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-heading font-bold text-lg pr-4">{q}</span>
        <ChevronDown size={20} className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </motion.div>
  );
};

const OurApproach = () => (
  <div className="min-h-screen">
    <Header />
    <main className="pt-28 pb-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            Our Philosophy
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Approach</h1>
          <p className="text-muted-foreground text-lg">
            Transparency, communication, and client empowerment drive every decision we make.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} {...faq} index={i} />
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default OurApproach;

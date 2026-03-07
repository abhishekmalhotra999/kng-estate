import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero-home.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Luxury home" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-6 py-2 rounded-full bg-accent/20 backdrop-blur-md text-accent-foreground text-sm font-medium mb-8 border border-accent/30">
            Your Friends in the Real Estate World
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-card mb-6 leading-tight"
        >
          CONGRATULATIONS
          <span className="block text-xl md:text-2xl lg:text-3xl font-body font-light mt-4 text-card/80">
            For getting one step closer to your Happy Place!
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <a
            href="/contact"
            className="px-8 py-4 rounded-full bg-accent text-accent-foreground font-medium text-lg hover:opacity-90 transition-all active:scale-95 shadow-lg"
          >
            Get Started
          </a>
          <a
            href="/approach"
            className="px-8 py-4 rounded-full bg-card/10 backdrop-blur-md text-card font-medium text-lg border border-card/20 hover:bg-card/20 transition-all active:scale-95"
          >
            Our Approach
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-card/60"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;

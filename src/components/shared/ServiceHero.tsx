import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const ServiceHero = ({ title, subtitle, description, image }: ServiceHeroProps) => {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-accent/20 backdrop-blur-md text-accent-foreground text-sm font-medium mb-6 border border-accent/30">
            {subtitle}
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-card mb-6">
            {title}
          </h1>
          <p className="text-lg text-card/80 leading-relaxed mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-accent text-accent-foreground font-medium text-lg hover:opacity-90 transition-all active:scale-95 text-center"
            >
              BUY WITH US
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-card/10 backdrop-blur-md text-card font-medium text-lg border border-card/20 hover:bg-card/20 transition-all active:scale-95 text-center"
            >
              SELL WITH US
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;

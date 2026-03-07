import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutTeaser = () => {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent/10 text-accent mb-8">
              <Heart size={16} />
              <span className="text-sm font-medium">About Us</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              We Care, That's Why We Share!
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              At KNG Estate, we're more than just real estate agents — we're your partners in finding the
              perfect place to call home. Our team combines deep local knowledge with a genuine passion for
              helping families and businesses find their ideal space. Whether you're buying your first home,
              investing in commercial property, or exploring agricultural land, we're here to guide you every step of the way.
            </p>

            <Link
              to="/team"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/10"
            >
              Meet Our Team
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;

import { motion } from "framer-motion";
import { Map, Shield, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Map,
    title: "Knowledge is your Treasure Map",
    description: "We equip you with deep market insights so you can navigate every decision with confidence.",
  },
  {
    icon: Shield,
    title: "Honesty is the Best Policy",
    description: "Transparency at every step. No surprises, no hidden agendas — just straightforward guidance you can trust.",
  },
  {
    icon: TrendingUp,
    title: "Market Savvy & Client Focused",
    description: "We blend sharp market analysis with a genuine focus on your goals to deliver results that matter.",
  },
];

const ValueSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Find a Real Estate Team that You can <span className="text-gradient-gold">Trust!</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe that trust is the foundation of every great real estate journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-5xl p-8 shadow-premium border border-border/50 hover:shadow-premium-hover transition-all duration-300 group"
            >
              <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                <item.icon size={26} className="text-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;

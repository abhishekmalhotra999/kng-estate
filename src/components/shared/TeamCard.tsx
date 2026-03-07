import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  delay?: number;
}

const TeamCard = ({ name, role, bio, image, delay = 0 }: TeamCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-card rounded-5xl shadow-premium border border-border/50 overflow-hidden group hover:shadow-premium-hover transition-all duration-300"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold">{name}</h3>
        <p className="text-sm text-accent font-medium mb-3">{role}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{bio}</p>
        <div className="flex gap-2">
          <button className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
            <Mail size={16} />
          </button>
          <button className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
            <Phone size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;

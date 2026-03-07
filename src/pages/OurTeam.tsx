import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TeamCard from "@/components/shared/TeamCard";
import { motion } from "framer-motion";
import prerna from "@/assets/team-prerna.jpg";
import member2 from "@/assets/team-member2.jpg";
import member3 from "@/assets/team-member3.jpg";

const team = [
  {
    name: "Prerna Sharma",
    role: "Lead Real Estate Agent",
    bio: "With years of experience in the Surrey market, Prerna brings deep knowledge and a warm, client-first approach to every transaction.",
    image: prerna,
  },
  {
    name: "David Mitchell",
    role: "Senior Broker",
    bio: "David's keen eye for market trends and negotiation skills have helped hundreds of clients achieve their real estate goals.",
    image: member2,
  },
  {
    name: "Sarah Chen",
    role: "Client Relations Manager",
    bio: "Sarah ensures every client journey is smooth, informed, and stress-free from first meeting to closing day.",
    image: member3,
  },
];

const OurTeam = () => (
  <div className="min-h-screen">
    <Header />
    <main className="pt-28 pb-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            The People Behind KNG
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Meet Our Team</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A dedicated group of professionals who truly care about finding your perfect property.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <TeamCard key={member.name} {...member} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default OurTeam;

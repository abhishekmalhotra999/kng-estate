import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TeamCard from "@/components/shared/TeamCard";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
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

const OurTeam = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".team-header-item",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.2 }
    );
    
    // Team cards themselves handle their scroll trigger appearance, 
    // but if we wanted to sequence them after the header we could do it here.
    // Since TeamCard uses scrollTrigger, let's just let them be independent.

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="team-header-item inline-block px-4 py-1.5 bg-gray-100 text-black text-xs font-bold tracking-widest uppercase mb-6 border border-gray-200">
              The People Behind KNG
            </span>
            <h1 className="team-header-item text-4xl md:text-5xl font-heading font-medium mb-4">Meet Our Team</h1>
            <p className="team-header-item text-muted-foreground max-w-2xl mx-auto text-lg font-light">
              A dedicated group of professionals who truly care about finding your perfect property.
            </p>
          </div>

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
};

export default OurTeam;

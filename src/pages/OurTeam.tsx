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
    bio: "With years of experience in the Tricity market, Prerna brings deep knowledge and a warm, client-first approach to every transaction.",
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

  useGSAP(
    () => {
      // Eyebrow
      gsap.fromTo(
        ".team-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.3 }
      );

      // Title word reveal
      const words = gsap.utils.toArray(".team-title-word") as HTMLElement[];
      gsap.fromTo(
        words,
        { y: 60, opacity: 0, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.4,
        }
      );

      // Line draw
      gsap.fromTo(
        ".team-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          transformOrigin: "left",
          delay: 0.7,
        }
      );

      // Description
      gsap.fromTo(
        ".team-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.9 }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="min-h-screen bg-[#FCFBF8] text-gray-900">
      <Header />
      <main>
        {/* ─── Hero Section ─── */}
        <section className="relative pt-36 md:pt-44 pb-20 px-6 md:px-12 lg:px-20 xl:px-28 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a96e]/[0.03] blur-[150px] rounded-full pointer-events-none" />

          <div className="container mx-auto">
            <div className="max-w-3xl">
              <span className="team-eyebrow inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e] mb-6">
                <span className="block w-8 h-[1px] bg-[#c9a96e]/50" />
                The People Behind KNG
              </span>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-medium leading-[1.05] mb-8"
                style={{ perspective: "800px" }}
              >
                {["Meet", "the", "Team"].map((word, i) => (
                  <span
                    key={i}
                    className="team-title-word inline-block mr-[0.25em]"
                  >
                    {word}
                  </span>
                ))}
                <br />
                {["Behind", "Your"].map((word, i) => (
                  <span
                    key={i}
                    className="team-title-word inline-block mr-[0.25em] text-gray-600"
                  >
                    {word}
                  </span>
                ))}
                <span className="team-title-word inline-block italic font-light text-[#c9a96e]">
                  Success
                </span>
              </h1>

              <div className="team-line w-16 h-[2px] bg-[#c9a96e] mb-8" />

              <p className="team-desc text-lg text-gray-600 font-light leading-relaxed max-w-xl">
                A dedicated group of professionals who truly care about finding
                your perfect property. We bring passion, expertise, and genuine
                heart to every relationship.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Team Grid ─── */}
        <section className="bg-white px-6 md:px-12 lg:px-20 xl:px-28 py-32">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {team.map((member, i) => (
                <TeamCard key={member.name} {...member} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OurTeam;

import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TeamCard from "@/components/shared/TeamCard";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import nanakPlaceholder from "@/assets/team-nanak-placeholder.svg";
import lalitPlaceholder from "@/assets/team-lalit-placeholder.svg";
import kabirPlaceholder from "@/assets/team-kabir-placeholder.svg";

const team = [
  {
    name: "Nanak K. Arora",
    role: "Director, Business Development",
    bio: "Nanak drives strategic growth initiatives and market expansion with a disciplined, client-focused approach.",
    image: nanakPlaceholder,
  },
  {
    name: "Lalit K. Arora",
    role: "Owner & Founder",
    bio: "Lalit leads the vision of KNG Estate, guiding clients through high-value decisions with trust, integrity, and precision.",
    image: lalitPlaceholder,
  },
  {
    name: "Kabir K. Arora",
    role: "Director, Client Relations",
    bio: "Kabir oversees client experience and execution excellence, ensuring each deal progresses smoothly from inquiry to closure.",
    image: kabirPlaceholder,
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
    <div ref={container} className="min-h-screen bg-[#f8f5ee] text-gray-900">
      <Header />
      <main>
        {/* ─── Hero Section ─── */}
        <section className="relative pt-36 md:pt-44 pb-16 md:pb-18 px-6 md:px-12 lg:px-20 xl:px-28 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a96e]/[0.03] blur-[150px] rounded-full pointer-events-none" />

          <div className="container mx-auto">
            <div className="max-w-3xl">
              <span className="team-eyebrow inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e]/85 mb-6">
                <span className="block w-8 h-[1px] bg-[#c9a96e]/50" />
                The People Behind KNG
              </span>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-medium leading-[1.05] mb-8 text-gray-900/95"
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
                    className="team-title-word inline-block mr-[0.25em] text-gray-700/80"
                  >
                    {word}
                  </span>
                ))}
                <span className="team-title-word inline-block italic font-light text-[#c9a96e]">
                  Success
                </span>
              </h1>

              <div className="team-line w-16 h-[2px] bg-[#c9a96e] mb-8" />

              <p className="team-desc text-lg text-gray-700/80 font-normal leading-relaxed max-w-xl">
                A dedicated group of professionals who truly care about finding
                your perfect property. We bring passion, expertise, and genuine
                heart to every relationship.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Team Grid ─── */}
        <section className="bg-[#f4f1e9] px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-24">
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

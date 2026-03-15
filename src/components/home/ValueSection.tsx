import { useRef } from "react";
import { Map, Shield, TrendingUp, Gem, Users, Award } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const values = [
  {
    icon: Map,
    title: "Knowledge is Your Treasure Map",
    description:
      "We equip you with deep market insights so you can navigate every decision with confidence.",
    accent: "01",
  },
  {
    icon: Shield,
    title: "Honesty is the Best Policy",
    description:
      "Transparency at every step. No surprises, no hidden agendas — just straightforward guidance you can trust.",
    accent: "02",
  },
  {
    icon: TrendingUp,
    title: "Market Savvy & Client Focused",
    description:
      "We blend sharp market analysis with a genuine focus on your goals to deliver results that matter.",
    accent: "03",
  },
  {
    icon: Gem,
    title: "Premium Quality Standards",
    description:
      "Every property we represent meets our rigorous standards — because your investment deserves nothing less.",
    accent: "04",
  },
  {
    icon: Users,
    title: "Lasting Relationships",
    description:
      "We don't just close deals — we build relationships that continue long after the final handshake.",
    accent: "05",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description:
      "Decades of consistent results across residential, commercial, and agricultural properties.",
    accent: "06",
  },
];

const ValueSection = () => {
  const container = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ─── Horizontal Scroll: Pin the section, scroll the cards track sideways ───
      const track = trackRef.current;
      if (!track) return;

      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // ─── Headline reveal ───
      gsap.fromTo(
        ".val-eyebrow",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
        }
      );
      gsap.fromTo(
        ".val-headline",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative bg-[#f4f1e9] text-gray-900 overflow-hidden"
    >
      {/* Top border */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />

      <div className="min-h-screen flex flex-col justify-center">
        {/* ─── Section Header (fixed while scrolling) ─── */}
        <div
          ref={headlineRef}
          className="px-8 md:px-16 lg:px-20 xl:px-28 pt-20 pb-12"
        >
          <span className="val-eyebrow inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e]/85 mb-5">
            <span className="block w-8 h-[1px] bg-[#c9a96e]/50" />
            Our Values
          </span>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <h2 className="val-headline text-4xl sm:text-5xl md:text-6xl font-heading font-medium leading-[1.05] text-gray-900/95">
              What Drives
              <br />
              <span className="italic font-light text-[#c9a96e]">
                Everything
              </span>{" "}
              We Do
            </h2>
            <p className="val-headline text-gray-700/80 text-sm max-w-xs leading-relaxed font-normal">
              Scroll horizontally to explore the principles that shape our
              commitment to you.
            </p>
          </div>
        </div>

        {/* ─── Horizontal Scroll Track ─── */}
        <div
          ref={trackRef}
          className="flex gap-6 px-8 md:px-16 lg:px-20 xl:px-28 pb-20 will-change-transform"
        >
          {values.map((item, i) => (
            <div
              key={item.title}
              className="group relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] xl:w-[28vw] p-8 md:p-10 border border-[#d9cfbd] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_34px_rgba(0,0,0,0.08)] hover:border-[#c9a96e]/45 transition-all duration-500"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-l from-[#c9a96e]/40 to-transparent" />
              <div className="absolute top-0 right-0 h-12 w-[1px] bg-gradient-to-b from-[#c9a96e]/40 to-transparent" />

              {/* Number */}
              <span className="block font-heading text-6xl md:text-7xl font-light text-[#b8924f]/90 group-hover:text-[#a88445] transition-colors duration-500 mb-6 select-none leading-none">
                {item.accent}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center border border-[#c9a96e]/20 text-[#c9a96e]/90 group-hover:text-[#c9a96e] group-hover:border-[#c9a96e]/40 mb-6 transition-all duration-500">
                <item.icon size={22} strokeWidth={1.2} />
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-heading font-medium mb-4 text-gray-900/92 group-hover:text-[#a88445] transition-colors duration-500 leading-snug">
                {item.title}
              </h3>
              <p className="text-[15px] text-gray-700/80 leading-[1.75] font-normal transition-colors duration-500">
                {item.description}
              </p>

              {/* Bottom line reveal */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9a96e]/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;

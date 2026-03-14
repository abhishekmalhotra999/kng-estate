import { useRef } from "react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const ExperienceSection = () => {
  const container = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ─── Text Color Reveal: Each word transitions from dim to white as user scrolls ───
      const words = gsap.utils.toArray(".reveal-word") as HTMLElement[];
      words.forEach((word) => {
        gsap.fromTo(
          word,
          { color: "rgba(17,24,39,0.08)" },
          {
            color: "rgba(17,24,39,1)",
            ease: "none",
            scrollTrigger: {
              trigger: word,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });

      // ─── Gold words get gold color instead of white ───
      const goldWords = gsap.utils.toArray(".reveal-word-gold") as HTMLElement[];
      goldWords.forEach((word) => {
        gsap.fromTo(
          word,
          { color: "rgba(201,169,110,0.08)" },
          {
            color: "rgba(201,169,110,1)",
            ease: "none",
            scrollTrigger: {
              trigger: word,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });

      // ─── Badge fade ───
      gsap.fromTo(
        ".exp-badge",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: { trigger: container.current, start: "top 75%" },
        }
      );

      // ─── Counter Animation with scrub ───
      const stats = gsap.utils.toArray(".stat-number") as HTMLElement[];
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target") || "0", 10);
        gsap.fromTo(
          stat,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: countersRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
            ease: "power1.out",
          }
        );
      });

      // ─── Stat labels stagger ───
      gsap.fromTo(
        ".stat-label",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          scrollTrigger: {
            trigger: countersRef.current,
            start: "top 80%",
          },
        }
      );

      // ─── City pills slide in ───
      gsap.fromTo(
        ".city-pill",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".city-pills-container",
            start: "top 85%",
          },
        }
      );
    },
    { scope: container }
  );

  // Split text into individual word spans
  const renderRevealText = (text: string, isGold = false) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`${isGold ? "reveal-word-gold" : "reveal-word"} inline-block mr-[0.3em]`}
      >
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={container}
      className="relative bg-[#f8f5ee] text-gray-900 overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c9a96e]/[0.02] blur-[200px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-32 md:py-44">
        {/* Badge */}
        <div className="exp-badge mb-16">
          <span className="inline-flex items-center gap-3 px-5 py-2 border border-[#c9a96e]/20 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e]">
            <span className="w-2 h-2 rounded-full bg-[#c9a96e]/40" />
            Established 2004
          </span>
        </div>

        {/* ─── Scroll-revealed manifesto text ─── */}
        <div className="max-w-5xl mb-24">
          <h2
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-medium leading-[1.1] mb-10"
            style={{ lineHeight: 1.15 }}
          >
            {renderRevealText("For over two decades we have been")}
            <br className="hidden md:block" />
            {renderRevealText("the trusted name in", true)}
            <br className="hidden md:block" />
            {renderRevealText("luxury real estate across the Tricity.")}
          </h2>

          <p className="text-lg md:text-xl text-gray-700 font-normal leading-relaxed max-w-2xl">
            {renderRevealText(
              "Connecting visionaries with their dream properties in Chandigarh, Mohali, and Panchkula — with absolute discretion and unmatched expertise."
            )}
          </p>
        </div>

        {/* ─── Stats + Cities ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          {/* Counter Stats */}
          <div
            ref={countersRef}
            className="grid grid-cols-3 gap-8 border-t border-black/[0.05] pt-10"
          >
            {[
              { target: 500, label: "Happy Families" },
              { target: 450, label: "Premium Deals" },
              { target: 20, label: "Years of Trust", suffix: "+" },
            ].map((stat, i) => (
              <div key={i}>
                <span className="flex items-baseline gap-1">
                  <span
                    className="stat-number font-heading text-3xl md:text-4xl lg:text-5xl font-light text-gray-900"
                    data-target={stat.target}
                  >
                    0
                  </span>
                  {stat.suffix && (
                    <span className="text-[#c9a96e] text-xl md:text-2xl font-heading">
                      {stat.suffix}
                    </span>
                  )}
                </span>
                <span className="stat-label block text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-gray-700 mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* City pills */}
          <div className="city-pills-container flex flex-wrap gap-3 lg:justify-end">
            {[
              { label: "Chandigarh", sub: "The City Beautiful" },
              { label: "Mohali", sub: "Commercial Hub" },
              { label: "Panchkula", sub: "Serene Living" },
            ].map((city) => (
              <div
                key={city.label}
                className="city-pill group cursor-pointer px-6 py-3 border border-[#d8ceba] bg-white/85 hover:border-[#c9a96e]/45 hover:bg-[#fffaf0] shadow-[0_6px_18px_rgba(0,0,0,0.04)] transition-all duration-500"
              >
                <span className="block text-xs uppercase tracking-[0.15em] font-medium text-gray-900/90 group-hover:text-gray-900 transition-colors">
                  {city.label}
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-gray-700 mt-0.5">
                  {city.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

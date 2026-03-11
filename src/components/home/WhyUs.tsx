import { useRef } from "react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const features = [
  {
    number: "01",
    title: "Deep Market Intelligence",
    description:
      "We dive beneath surface-level data to uncover hidden value — ensuring every decision you make is grounded in comprehensive, up-to-the-minute market intelligence.",
  },
  {
    number: "02",
    title: "Master Negotiators",
    description:
      "Years of high-stakes experience means we know precisely when to hold firm and when to move. We consistently secure terms our clients thought impossible.",
  },
  {
    number: "03",
    title: "White-Glove Partnership",
    description:
      "Your journey is singular. We offer absolute discretion, precision communication, and a seamless process from first viewing to final signature.",
  },
];

const WhyUs = () => {
  const container = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ─── Scroll progress bar on the left side ───
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: container.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      // ─── Left sticky content reveal ───
      gsap.fromTo(
        ".why-eyebrow",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
          },
        }
      );

      // ─── Headline word-by-word stagger ───
      const headlineWords = gsap.utils.toArray(
        ".why-headline-word"
      ) as HTMLElement[];
      gsap.fromTo(
        headlineWords,
        { y: 60, opacity: 0, rotateX: 30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 65%",
          },
        }
      );

      // ─── Feature rows: scrub-driven reveal ───
      const featureEls = gsap.utils.toArray(
        ".why-feature"
      ) as HTMLElement[];
      featureEls.forEach((el, i) => {
        // Main content
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );

        // Number grows on scroll
        const numberEl = el.querySelector(".feature-number");
        gsap.fromTo(
          numberEl,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );

        // Hover: sweep line
        const line = el.querySelector(".feature-line");
        if (line) {
          gsap.set(line, { scaleX: 0, transformOrigin: "left" });
          el.addEventListener("mouseenter", () =>
            gsap.to(line, { scaleX: 1, duration: 0.4, ease: "power2.out" })
          );
          el.addEventListener("mouseleave", () =>
            gsap.to(line, { scaleX: 0, duration: 0.3, ease: "power2.in" })
          );
        }
      });

      // ─── Sub-text color reveal ───
      gsap.fromTo(
        ".why-subtext",
        { color: "rgba(17,24,39,0.1)" },
        {
          color: "rgba(17,24,39,0.7)",
          ease: "none",
          scrollTrigger: {
            trigger: ".why-subtext",
            start: "top 85%",
            end: "top 55%",
            scrub: true,
          },
        }
      );
    },
    { scope: container }
  );

  // Helper to split headline into words
  const splitWords = (text: string, className = "") =>
    text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`why-headline-word inline-block mr-[0.25em] ${className}`}
        style={{ perspective: "600px" }}
      >
        {word}
      </span>
    ));

  return (
    <section
      ref={container}
      className="bg-[#FCFBF8] text-gray-900 overflow-hidden relative"
    >
      {/* Top border accent */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-32 md:py-44">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative">
          {/* ─── Left Column: Sticky with scroll progress ─── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            {/* Scroll progress line */}
            <div className="hidden lg:block absolute -left-8 top-0 bottom-0 w-[2px] bg-black/[0.03]">
              <div
                ref={progressRef}
                className="absolute inset-x-0 top-0 bg-[#c9a96e] w-full"
                style={{ height: "100%" }}
              />
            </div>

            <span className="why-eyebrow block text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e] mb-8">
              Why KNG Estate
            </span>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium leading-[0.95] mb-10">
              {splitWords("The Standard")}
              <br />
              {splitWords("others", "text-gray-600 italic font-light")}
              {splitWords("follow.", "text-gray-600 italic font-light")}
            </h2>

            <p className="why-subtext font-body text-lg max-w-xs leading-relaxed font-light">
              In a market full of noise, we offer something rare — clarity,
              conviction, and results that speak for themselves.
            </p>

            <div className="w-12 h-[2px] bg-[#c9a96e]/50 mt-10" />
          </div>

          {/* ─── Right Column: Scrub-animated features ─── */}
          <div className="lg:col-span-7 space-y-0">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="why-feature group relative py-12 border-b border-black/[0.05] last:border-b-0 cursor-default"
              >
                {/* Hover sweep line */}
                <div className="feature-line absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9a96e]" />

                <div className="flex items-start gap-6 md:gap-10">
                  {/* Number */}
                  <span className="feature-number font-heading text-5xl md:text-6xl font-light text-[#c9a96e]/60 group-hover:text-[#c9a96e]/40 transition-colors duration-700 leading-none mt-1 shrink-0 select-none">
                    {feature.number}
                  </span>

                  <div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-medium mb-4 group-hover:text-[#c9a96e] transition-colors duration-500">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base max-w-lg group-hover:text-gray-600 transition-colors duration-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent" />
    </section>
  );
};

export default WhyUs;

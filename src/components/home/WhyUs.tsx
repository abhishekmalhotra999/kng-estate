import { useRef } from "react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const features = [
  {
    number: "01",
    title: "Deep Market Intelligence",
    description: "We dive beneath surface-level data to uncover hidden value — ensuring every decision you make is grounded in comprehensive, up-to-the-minute market intelligence.",
  },
  {
    number: "02",
    title: "Master Negotiators",
    description: "Years of high-stakes experience means we know precisely when to hold firm and when to move. We consistently secure terms our clients thought impossible.",
  },
  {
    number: "03",
    title: "White-Glove Partnership",
    description: "Your journey is singular. We offer absolute discretion, precision communication, and a seamless process from first viewing to final signature.",
  },
];

const WhyUs = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    tl.fromTo(".why-eyebrow",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(".why-headline",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(".why-divider",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power3.inOut", transformOrigin: "left" },
      "-=0.6"
    )
    .fromTo(".why-feature",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
      "-=0.5"
    );

    // Hover line animation per feature row
    gsap.utils.toArray(".why-feature").forEach((el) => {
      const line = (el as HTMLElement).querySelector(".feature-line");
      gsap.set(line, { scaleX: 0, transformOrigin: "left" });
      (el as HTMLElement).addEventListener("mouseenter", () =>
        gsap.to(line, { scaleX: 1, duration: 0.4, ease: "power2.out" })
      );
      (el as HTMLElement).addEventListener("mouseleave", () =>
        gsap.to(line, { scaleX: 0, duration: 0.3, ease: "power2.in" })
      );
    });

  }, { scope: container });

  return (
    <section ref={container} className="bg-[#0f0f0f] text-white overflow-hidden relative">

      {/* Top border accent */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left Sticky Column */}
          <div className="lg:col-span-5 lg:sticky top-28">
            <span className="why-eyebrow block text-[11px] font-bold tracking-[0.3em] uppercase text-primary mb-8">
              Why KNG Estate
            </span>
            <h2 className="why-headline text-5xl md:text-6xl lg:text-7xl font-heading font-medium leading-[0.95] mb-10">
              The Standard <br />
              <em className="font-serif font-light text-white/40 not-italic">others follow.</em>
            </h2>
            <p className="text-white/50 font-light leading-relaxed text-lg max-w-xs">
              In a market full of noise, we offer something rare — clarity, conviction, and results.
            </p>
            <div className="why-divider w-16 h-[2px] bg-primary mt-10" />
          </div>

          {/* Right Features Column */}
          <div className="lg:col-span-7 divide-y divide-white/8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="why-feature group relative pt-10 pb-10 cursor-default first:pt-0"
              >
                {/* Hover sweep line */}
                <div className="feature-line absolute bottom-0 left-0 right-0 h-[1px] bg-primary" />

                <div className="flex items-start gap-8">
                  <span className="font-heading text-5xl font-light text-white/10 group-hover:text-primary/40 transition-colors duration-500 leading-none mt-1 shrink-0 select-none">
                    {feature.number}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-heading font-medium mb-4 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 font-light leading-relaxed text-base md:text-lg max-w-lg">
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
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </section>
  );
};

export default WhyUs;

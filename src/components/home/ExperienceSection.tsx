import { useRef } from "react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const ExperienceSection = () => {
  const container = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".exp-line", 
      { scaleY: 0 }, 
      { scaleY: 1, duration: 1.5, ease: "power3.inOut", transformOrigin: "top" }
    )
    .fromTo(".exp-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=1"
    )
    .fromTo(".exp-desc",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Counter Animation
    const stats = gsap.utils.toArray(".stat-number") as HTMLElement[];
    stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target") || "0", 10);
        gsap.to(stat, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
                trigger: countersRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            ease: "power1.out",
        });
    });

  }, { scope: container });

  return (
    <section ref={container} className="py-32 bg-white text-black overflow-hidden relative">
      {/* Decorative vertical line */}
      <div className="exp-line absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-primary/30 hidden md:block" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Headline */}
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 border border-primary/20 rounded-full text-xs font-bold tracking-widest uppercase mb-6 text-primary">
                Established 2004
            </span>
            <h2 className="exp-title text-5xl md:text-7xl lg:text-8xl font-heading font-medium leading-[0.9] tracking-tighter mb-8">
              20+ Years <br />
              <span className="text-primary/40 italic font-serif">of Excellence</span>
            </h2>
            
            {/* Stats Grid */}
            <div ref={countersRef} className="grid grid-cols-2 gap-8 mt-12 border-t border-gray-100 pt-8">
                <div>
                     <span className="stat-number text-4xl font-light font-heading block" data-target="500">0</span>
                     <span className="text-sm text-gray-400 uppercase tracking-widest mt-2 block">Happy Families</span>
                </div>
                <div>
                     <span className="stat-number text-4xl font-light font-heading block" data-target="450">0</span>
                     <span className="text-sm text-gray-400 uppercase tracking-widest mt-2 block">Premium Deals</span>
                </div>
            </div>
          </div>

          {/* Right Column: Description & Locations */}
          <div className="relative">
             <div className="absolute -left-12 -top-12 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse pointer-events-none" />
             
             <p className="exp-desc text-lg md:text-2xl text-gray-800 font-light leading-relaxed mb-12 max-w-xl relative transform transition-all hover:translate-x-2 duration-300 cursor-default">
              Establishing the standard for luxury real estate in the Tricity. 
              We are the premier brokers connecting visionaries with their dream properties across 
              <span className="text-primary font-medium italic"> Chandigarh</span>, 
              <span className="text-primary font-medium italic"> Mohali</span>, and 
              <span className="text-primary font-medium italic"> Panchkula</span>.
            </p>
            
            <div className="exp-cities flex flex-wrap gap-4 pt-4">
              {[
                { label: "Chandigarh", sub: "The City Beautiful" },
                { label: "Mohali", sub: "Commercial Hub" },
                { label: "Panchkula", sub: "Serene Living" }
              ].map((city) => (
                <div key={city.label} className="group cursor-pointer px-6 py-3 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                  <span className="text-sm uppercase tracking-widest font-medium">{city.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const heroImages = [
  "https://images.unsplash.com/photo-1600596542815-2a4fe8f3106c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1984&auto=format&fit=crop"
];

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial loading animation
    const tl = gsap.timeline();
    
    tl.fromTo(
      ".hero-line",
      { height: 0 },
      { height: "4rem", duration: 1, ease: "power2.inOut" }
    )
    .fromTo(
      ".hero-text-item",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(
      ".scroll-indicator",
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.5 },
      "-=0.5"
    );

    // Parallax Effect
    gsap.to(slidesRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(contentRef.current, {
      yPercent: 50,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom center",
        scrub: true,
      },
    });

    // Slideshow Logic
    const slides = gsap.utils.toArray(".hero-slide") as HTMLElement[];
    if (slides.length > 0) {
      let current = 0;
      const zIndexMin = 0;
      const zIndexMax = 10;
      
      // CSS inline styles handle initial visibility — no GSAP set needed for opacity
      // Just set z-indices
      gsap.set(slides, { zIndex: zIndexMin });
      gsap.set(slides[0], { zIndex: zIndexMax });
      
      // Start initial Ken Burns
      gsap.fromTo(slides[0], 
          { scale: 1 }, 
          { scale: 1.1, duration: 6, ease: "none" }
      );

      const nextSlide = () => {
          const prev = slides[current];
          current = (current + 1) % slides.length;
          const next = slides[current];

          // Prepare next slide
          gsap.set(next, { zIndex: zIndexMax, opacity: 0, scale: 1 });
          gsap.set(prev, { zIndex: zIndexMin + 1 }); 

          const transitionTl = gsap.timeline({
              onComplete: () => {
                  gsap.set(prev, { zIndex: zIndexMin, opacity: 0 });
                  gsap.delayedCall(4, nextSlide);
              }
          });

          transitionTl
            .to(next, { opacity: 1, duration: 2, ease: "power2.inOut" })
            .to(next, { scale: 1.1, duration: 6, ease: "none" }, 0);
      };

      gsap.delayedCall(4, nextSlide);
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <div ref={slidesRef} className="absolute inset-0 w-full h-full">
            {heroImages.map((img, index) => (
                <div 
                    key={index}
                    className="hero-slide absolute inset-0 w-full h-full will-change-transform"
                    style={{ opacity: index === 0 ? 1 : 0 }}
                >
                    <img
                        src={img}
                        alt={`Luxury Residence ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading={index === 0 ? "eager" : "lazy"}
                        // @ts-ignore
                        fetchPriority={index === 0 ? "high" : "low"}
                    />
                    {/* solid overlay keeps text legible without img opacity tricks */}
                    <div className="absolute inset-0 bg-black/45" />
                </div>
            ))}
        </div>
      </div>

      {/* Content Container */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center will-change-transform">
        
        {/* Animated Line */}
        <div className="hero-line w-[1px] bg-white/50 mb-8 hidden md:block" />

        {/* Eyebrow Text */}
        <span className="hero-text-item block text-white/90 uppercase tracking-[0.3em] text-xs md:text-sm font-body mb-6">
          Exclusive Real Estate
        </span>

        {/* Main Headline */}
        <h1 className="hero-text-item font-heading text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-[1.1] mb-8">
          Defining the <br className="hidden md:block" />
          <span className="italic font-light text-primary-foreground">Art of Living</span>
        </h1>

        {/* Description/Subhead */}
        <p className="hero-text-item font-body text-white/80 text-sm md:text-base max-w-lg leading-relaxed mb-12 tracking-wide">
          Curating exceptional properties for those who accept nothing less than perfection. Discover a home that reflects your achievements.
        </p>

        {/* CTA Button */}
        <div className="hero-text-item">
          <a
            href="/residential"
            className="group relative px-8 py-3 overflow-hidden border border-white/30 hover:border-primary text-white transition-all duration-300 rounded-none bg-transparent hover:bg-primary/20 flex items-center justify-center gap-4"
          >
            <span className="relative z-10 font-body text-xs md:text-sm tracking-widest uppercase">
              Explore Collection
            </span>
             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pb-8">
        <span className="text-[10px] uppercase tracking-widest text-white/50 font-body">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>

    </section>
  );
};

export default Hero;

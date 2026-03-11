import { useRef, useState, useCallback, useEffect } from "react";
import { ArrowRight, MapPin, ChevronDown } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { useIsMobile } from "@/hooks/use-mobile";

import heroHome from "@/assets/hero-home.jpg";
import heroMansion from "@/assets/hero-mansion.png";
import heroDusk from "@/assets/hero-dusk.png";
import heroInterior from "@/assets/hero-interior.png";
import residential from "@/assets/residential.jpg";

const heroImages = [heroHome, heroMansion, heroDusk, heroInterior, residential];

const stats = [
  { value: "200+", label: "Properties Sold" },
  { value: "$2B+", label: "Portfolio Value" },
  { value: "15+", label: "Years of Trust" },
];

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveSlide((prev) => (prev + 1) % heroImages.length);
    setTimeout(() => setIsTransitioning(false), 1200);
  }, [isTransitioning]);

  // Auto-advance slides
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(nextSlide, isMobile ? 7000 : 5500);
    return () => clearInterval(interval);
  }, [nextSlide, isMobile, prefersReducedMotion]);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Curtain reveal: gold accent line grows
      tl.fromTo(
        ".hero-accent-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, transformOrigin: "left center" }
      )
        // eyebrow fades up
        .fromTo(
          ".hero-eyebrow",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        // Main headline letters stagger
        .fromTo(
          ".hero-headline-word",
          { y: 80, opacity: 0, rotateX: 40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.15,
          },
          "-=0.5"
        )
        // Sub text
        .fromTo(
          ".hero-subtext",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        // CTA
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        )
        // Image reveal
        .fromTo(
          ".hero-image-wrapper",
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.4,
            ease: "power4.inOut",
          },
          "-=1.2"
        )
        // Stats
        .fromTo(
          ".hero-stat",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
          "-=0.6"
        )
        // Scroll indicator
        .fromTo(
          ".hero-scroll-cue",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2"
        );

      // Continuous floating animation for the scroll indicator
      if (!isMobile) {
        gsap.to(".hero-scroll-cue .scroll-chevron", {
          y: 6,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Parallax on scroll
      if (!isMobile) {
        gsap.to(".hero-image-wrapper", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-content-left", {
          yPercent: 30,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "80% top",
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef, dependencies: [isMobile, prefersReducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-screen w-full overflow-hidden bg-[#FCFBF8]"
    >
      {/* ─── Subtle grid texture ─── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ─── Content Grid ─── */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* ─── LEFT: Text Content ─── */}
        <div className="hero-content-left flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 xl:px-28 pt-32 pb-16 lg:pt-0 lg:pb-0 will-change-transform">
          {/* Gold accent line */}
          <div className="hero-accent-line w-16 h-[2px] mb-8" style={{ backgroundImage: "linear-gradient(to right, var(--kng-gold), #e8c87e)" }} />

          {/* Eyebrow */}
          <span className="hero-eyebrow inline-flex items-center gap-2 kng-gold-text uppercase tracking-[0.35em] text-[10px] md:text-xs font-body font-medium mb-6">
            <MapPin className="w-3 h-3" />
            Surrey &middot; Greater Vancouver
          </span>

          {/* Headline */}
          <h1
            className="font-heading text-gray-900 leading-[1.05] mb-8"
            style={{ perspective: "800px" }}
          >
            <span className="hero-headline-word block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-medium">
              Redefining
            </span>
            <span className="hero-headline-word block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-medium">
              Luxury
            </span>
            <span className="hero-headline-word block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] italic font-light kng-gold-text">
              Real Estate
            </span>
          </h1>

          {/* Subtext */}
          <p className="hero-subtext font-body text-gray-600 text-sm md:text-[15px] max-w-md leading-[1.8] tracking-wide mb-10">
            We curate extraordinary residences for discerning individuals —
            where architectural vision meets an unparalleled standard of living.
          </p>

          {/* CTA */}
          <div className="hero-cta flex flex-col sm:flex-row items-start gap-5">
            <a
              href="/residential"
              className="group relative inline-flex items-center gap-4 px-8 py-4 text-[var(--kng-ink)] font-body text-xs md:text-sm tracking-widest uppercase font-semibold transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] hover:scale-[1.02] min-h-[48px]"
              style={{ backgroundImage: "linear-gradient(to right, var(--kng-gold), var(--kng-gold-deep))" }}
            >
              View Properties
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-black/30 text-gray-900/80 font-body text-xs md:text-sm tracking-widest uppercase transition-all duration-500 hover:text-[var(--kng-gold)] min-h-[48px]"
              style={{ borderColor: "color-mix(in srgb, var(--kng-gold) 50%, rgba(0,0,0,0.3))" }}
            >
              Get in Touch
            </a>
          </div>

          {/* Stats row */}
          <div className="hidden md:flex items-center gap-12 mt-16 pt-8 border-t border-black/[0.05]">
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat">
                <span className="block font-heading text-2xl lg:text-3xl text-gray-900 font-medium">
                  {stat.value}
                </span>
                <span className="block font-body text-[10px] lg:text-[11px] uppercase tracking-[0.2em] text-gray-600 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT: Image Showcase ─── */}
        <div className="hero-image-wrapper relative flex-1 min-h-[50vh] lg:min-h-screen will-change-transform">
          {/* Images */}
          {heroImages.map((img, index) => (
            <div
              key={index}
              className="absolute inset-0 w-full h-full transition-opacity duration-[1200ms] ease-in-out"
              style={{ opacity: activeSlide === index ? 1 : 0 }}
            >
              <img
                src={img}
                alt={`Luxury Residence ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0a0a0a]/70 lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
            </div>
          ))}

          {/* Slide counter */}
          <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4">
            <span className="font-body text-xs tracking-[0.2em] text-gray-600">
              {String(activeSlide + 1).padStart(2, "0")}
            </span>
            <div className="w-12 h-[1px] bg-white/10 relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-[var(--kng-gold)] transition-all ease-linear"
                style={{
                  width: isTransitioning ? "0%" : "100%",
                  transitionDuration: isMobile ? "7000ms" : "5500ms",
                }}
              />
            </div>
            <span className="font-body text-xs tracking-[0.2em] text-gray-500">
              {String(heroImages.length).padStart(2, "0")}
            </span>
          </div>

          {/* Slide dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 z-20 flex items-center gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isTransitioning && i !== activeSlide) {
                    setIsTransitioning(true);
                    setActiveSlide(i);
                    setTimeout(() => setIsTransitioning(false), 1200);
                  }
                }}
                className={`transition-all duration-500 rounded-full ${i === activeSlide
                  ? "w-8 h-2 md:h-1.5 bg-[var(--kng-gold)]"
                  : "w-3 h-3 md:w-2 md:h-2 bg-[#c9a96e]/45 hover:bg-[#c9a96e]/80"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <div className="hero-scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-14 lg:translate-x-0 z-20 flex flex-col items-center gap-2">
        <span className="font-body text-[9px] uppercase tracking-[0.3em] text-gray-600">
          Scroll
        </span>
        <ChevronDown className="scroll-chevron w-4 h-4 text-gray-500" />
      </div>

      {/* ─── Side label (desktop) ─── */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20">
        <span
          className="font-body text-[9px] uppercase tracking-[0.4em] text-gray-900/15"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          KNG Estate &mdash; Est. 2009
        </span>
      </div>
    </section>
  );
};

export default Hero;

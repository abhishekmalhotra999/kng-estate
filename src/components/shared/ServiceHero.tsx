import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  primaryCtaLabel?: string;
  primaryCtaTo?: string;
  secondaryCtaLabel?: string;
  secondaryCtaTo?: string;
}

const ServiceHero = ({
  title,
  subtitle,
  description,
  image = "/placeholder.svg",
  primaryCtaLabel = "Start Your Project",
  primaryCtaTo = "/contact",
  secondaryCtaLabel = "Contact Us",
  secondaryCtaTo = "/contact",
}: ServiceHeroProps) => {
  const container = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isMobile = useIsMobile();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      // Image parallax
      if (!isMobile) {
        gsap.to(imageRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Image scale-in
      gsap.fromTo(
        imageRef.current,
        { scale: isMobile ? 1.06 : 1.2 },
        {
          scale: 1.05,
          duration: isMobile ? 0.7 : 1.8,
          ease: "power3.out",
        }
      );

      // Eyebrow
      gsap.fromTo(
        ".sh-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.3 }
      );

      // Split title words
      const words = gsap.utils.toArray(".sh-title-word") as HTMLElement[];
      gsap.fromTo(
        words,
        { y: isMobile ? 36 : 80, opacity: 0, rotateX: isMobile ? 0 : 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: isMobile ? 0.65 : 1,
          stagger: isMobile ? 0.05 : 0.08,
          ease: "power3.out",
          delay: 0.4,
        }
      );

      // Description
      gsap.fromTo(
        ".sh-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.8 }
      );

      // CTAs
      gsap.fromTo(
        ".sh-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: isMobile ? 0.45 : 0.6, stagger: 0.1, delay: 1 }
      );

      // Gold line draw
      gsap.fromTo(
        ".sh-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          transformOrigin: "left",
          delay: 0.6,
        }
      );
    },
    { scope: container, dependencies: [isMobile, prefersReducedMotion] }
  );

  // Split title into words for animation
  const titleWords = title.split(" ");

  return (
    <section
      ref={container}
      className="relative min-h-[85vh] flex items-end overflow-hidden bg-[#FCFBF8]"
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imageRef}
          src={image}
          alt={title}
          className="w-full h-full object-cover will-change-transform"
        />
        {/* Overlay layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFBF8] via-[#FCFBF8]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FCFBF8]/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 pb-20 pt-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <span className="sh-eyebrow inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e]/85 mb-6">
            <span className="block w-8 h-[1px] bg-[#c9a96e]/50" />
            {subtitle}
          </span>

          {/* Title — word by word */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-medium text-gray-900/95 mb-8 leading-[1]"
            style={{ perspective: "800px" }}
          >
            {titleWords.map((word, i) => (
              <span
                key={i}
                className="sh-title-word inline-block mr-[0.25em]"
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Gold line */}
          <div className="sh-line w-20 h-[2px] bg-[#c9a96e] mb-8" />

          {/* Description */}
          <p className="sh-desc text-lg md:text-xl text-gray-700/80 leading-relaxed mb-10 max-w-xl font-light">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={primaryCtaTo}
              className="sh-cta group inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#c9a96e] text-[#141108] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500"
            >
              {primaryCtaLabel}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              to={secondaryCtaTo}
              className="sh-cta inline-flex items-center justify-center gap-3 px-10 py-5 border border-black/10 text-gray-900 text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-500"
            >
              {secondaryCtaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;

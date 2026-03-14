import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import heroHome from "@/assets/hero-home.jpg";

const AboutTeaser = () => {
  const container = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ─── Image clip-path reveal on scroll ───
      gsap.fromTo(
        ".about-image-inner",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // ─── Parallax on the image ───
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // ─── Stat badge scale in ───
      gsap.fromTo(
        ".about-stat-badge",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".about-stat-badge",
            start: "top 85%",
          },
        }
      );

      // ─── Right side: word-by-word color reveal for the tagline ───
      const taglineWords = gsap.utils.toArray(
        ".about-tagline-word"
      ) as HTMLElement[];
      taglineWords.forEach((word) => {
        gsap.fromTo(
          word,
          { color: "rgba(0,0,0,0.1)" },
          {
            color: "rgba(0,0,0,0.85)",
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

      // ─── Gold words ───
      const goldTagline = gsap.utils.toArray(
        ".about-tagline-gold"
      ) as HTMLElement[];
      goldTagline.forEach((word) => {
        gsap.fromTo(
          word,
          { color: "rgba(150,120,60,0.1)" },
          {
            color: "hsl(38, 50%, 40%)",
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

      // ─── Description fade ───
      gsap.fromTo(
        ".about-desc",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".about-desc",
            start: "top 85%",
          },
        }
      );

      // ─── Trust counters stagger ───
      gsap.fromTo(
        ".about-trust-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".about-trust-grid",
            start: "top 85%",
          },
        }
      );

      // ─── CTA slide ───
      gsap.fromTo(
        ".about-cta",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".about-cta",
            start: "top 90%",
          },
        }
      );
    },
    { scope: container }
  );

  const renderTaglineWords = (text: string, isGold = false) =>
    text.split(" ").map((word, i) => (
      <span
        key={i}
        className={`${isGold ? "about-tagline-gold italic font-light" : "about-tagline-word"} inline-block mr-[0.28em]`}
      >
        {word}
      </span>
    ));

  return (
    <section ref={container} className="bg-[#f8f5ee] overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
        {/* ─── Image Side: Scroll-driven clip-path reveal ─── */}
        <div className="relative h-[60vw] lg:h-auto overflow-hidden order-2 lg:order-1">
          <div className="about-image-inner absolute inset-0 w-full h-full">
            <div
              ref={imageRef}
              className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform"
              style={{
                backgroundImage: `url('${heroHome}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 lg:hidden" />
          </div>

          {/* Stat badge */}
          <div className="about-stat-badge absolute bottom-10 left-10 z-10">
            <div className="bg-[#c9a96e] px-8 py-6 shadow-2xl">
              <span className="block text-5xl font-heading font-light text-gray-900">
                20
                <sup className="text-2xl">+</sup>
              </span>
              <span className="block text-[10px] text-gray-900/80 uppercase tracking-[0.2em] mt-1">
                Years of Excellence
              </span>
            </div>
          </div>
        </div>

        {/* ─── Content Side: Scroll-revealed text ─── */}
        <div className="flex flex-col justify-center px-10 lg:px-16 xl:px-24 py-24 bg-[#fdfbf7] order-1 lg:order-2">
          <span className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e] mb-10">
            <span className="block w-10 h-[1px] bg-[#c9a96e]/40" />
            Our Philosophy
          </span>

          {/* Scroll-revealed headline */}
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-heading font-medium mb-8 leading-[1.1]">
            {renderTaglineWords("We Care.")}
            <br />
            {renderTaglineWords("That's Why We", true)}
            <br />
            {renderTaglineWords("Share.", true)}
          </h2>

          <p className="about-desc text-lg text-gray-700 leading-relaxed mb-12 font-normal max-w-lg">
            At KNG Estate, we are more than agents — we are lifelong partners in
            your real estate journey. Our team brings deep local knowledge,
            genuine passion, and unwavering commitment to every client, every
            time.
          </p>

          {/* Trust signals */}
          <div className="about-trust-grid grid grid-cols-2 gap-8 border-t border-[#dfd6c8] pt-10 mb-12">
            <div className="about-trust-item">
              <span className="text-4xl font-heading font-light text-gray-900 block">
                500
                <span className="text-[#c9a96e]">+</span>
              </span>
              <span className="text-[10px] text-gray-700 uppercase tracking-[0.2em] mt-1 block">
                Families Served
              </span>
            </div>
            <div className="about-trust-item">
              <span className="text-4xl font-heading font-light text-gray-900 block">
                3
              </span>
              <span className="text-[10px] text-gray-700 uppercase tracking-[0.2em] mt-1 block">
                Cities Covered
              </span>
            </div>
          </div>

          <div className="about-cta">
            <Link
              to="/team"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-gray-900 text-[#FCFBF8] text-xs tracking-[0.2em] uppercase hover:bg-[#c9a96e] hover:text-gray-900 transition-all duration-500 shadow-lg"
            >
              Meet Our Team
              <ArrowRight
                size={14}
                className="group-hover:translate-x-2 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;

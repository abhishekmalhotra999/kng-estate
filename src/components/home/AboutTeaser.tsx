import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const AboutTeaser = () => {
  const container = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%", 
      }
    });

    tl.fromTo(".about-reveal", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
    );
    
    // Parallax image
    gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

  }, { scope: container });

  return (
    <section ref={container} className="bg-white overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">

        {/* Image Side — full bleed */}
        <div className="relative h-[60vw] lg:h-auto overflow-hidden order-2 lg:order-1 about-reveal">
          <div
            ref={imageRef}
            className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687920-4e03d6b26e2b?q=80&w=1470&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          {/* Luxury gold duotone tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Floating stat badge */}
          <div className="absolute bottom-10 left-10 about-reveal">
            <div className="bg-primary/90 backdrop-blur-sm px-8 py-6 shadow-2xl">
              <span className="block text-5xl font-heading font-light text-white">20<sup className="text-2xl">+</sup></span>
              <span className="block text-xs text-white/80 uppercase tracking-widest mt-1">Years of Excellence</span>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="flex flex-col justify-center px-10 lg:px-16 xl:px-24 py-24 bg-white order-1 lg:order-2">
          <span className="about-reveal inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] uppercase text-primary mb-10">
            <span className="block w-12 h-[1px] bg-primary/40" />
            Our Philosophy
          </span>

          <h2 className="about-reveal text-4xl md:text-5xl xl:text-6xl font-heading font-medium mb-8 leading-tight text-gray-900">
            We Care. <br />
            <em className="italic font-serif font-light text-primary">That's Why We Share.</em>
          </h2>

          <p className="about-reveal text-lg text-gray-500 leading-relaxed mb-12 font-light max-w-lg">
            At KNG Estate, we are more than agents — we are lifelong partners in your real estate journey.
            Our team brings deep local knowledge, genuine passion, and unwavering commitment to every client,
            every time.
          </p>

          {/* Trust signals */}
          <div className="about-reveal grid grid-cols-2 gap-8 border-t border-gray-100 pt-10 mb-12">
            <div>
              <span className="text-4xl font-heading font-light text-gray-900 block">500<span className="text-primary">+</span></span>
              <span className="text-xs text-gray-400 uppercase tracking-widest mt-1 block">Families Served</span>
            </div>
            <div>
              <span className="text-4xl font-heading font-light text-gray-900 block">3</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest mt-1 block">Cities Covered</span>
            </div>
          </div>

          <div className="about-reveal">
            <Link
              to="/team"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-gray-900 text-white text-xs tracking-[0.2em] uppercase hover:bg-primary transition-all duration-500 shadow-lg"
            >
              Meet Our Team
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutTeaser;

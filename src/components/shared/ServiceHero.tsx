import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
}

const ServiceHero = ({ title, subtitle, description, image = "/placeholder.svg" }: ServiceHeroProps) => {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(textRef.current?.children || [],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 0.2 }
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover scale-105"
          data-speed="0.5" // Optional: if using parallax later
        />
      </div>

      <div className="relative z-20 container mx-auto px-6 py-32">
        <div ref={textRef} className="max-w-3xl">
          <div className="mb-6">
             <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase border border-white/20">
              {subtitle}
            </span>
          </div>
         
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium text-white mb-6 leading-tight">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10 max-w-2xl font-light">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-black font-medium text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors text-center"
            >
              Start Project
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-transparent border border-white text-white font-medium text-sm tracking-widest uppercase hover:bg-white/10 transition-colors text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;

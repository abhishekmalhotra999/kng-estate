import { useRef } from "react";
import { Map, Shield, TrendingUp } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const values = [
  {
    icon: Map,
    title: "Knowledge is your Treasure Map",
    description: "We equip you with deep market insights so you can navigate every decision with confidence.",
  },
  {
    icon: Shield,
    title: "Honesty is the Best Policy",
    description: "Transparency at every step. No surprises, no hidden agendas — just straightforward guidance you can trust.",
  },
  {
    icon: TrendingUp,
    title: "Market Savvy & Client Focused",
    description: "We blend sharp market analysis with a genuine focus on your goals to deliver results that matter.",
  },
];

const ValueSection = () => {
  const container = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".val-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(".val-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.4"
    );

  }, { scope: container });

  return (
    <section ref={container} className="py-24 px-6 bg-primary/5 relative">
        {/* Light Gold Overlay Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply" />
        
      <div className="container mx-auto relative z-10">
        <div className="val-header text-center mb-20">
          <span className="inline-block px-3 py-1 bg-white border border-primary/20 rounded-full text-xs font-bold tracking-widest uppercase mb-4 text-primary shadow-sm">
            Our Core Values
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium mb-6">
            Find a Real Estate Team that You can <span className="text-primary italic font-serif">Trust</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light text-lg">
            We believe that trust is not given, it is earned. Here is how we build it every day.
          </p>
        </div>

        <div className="val-cards grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, i) => (
            <div
              key={item.title}
              className="val-card bg-white p-10 border border-primary/10 hover:border-primary/50 transition-all duration-500 group shadow-lg hover:shadow-2xl hover:-translate-y-2 rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-700 ease-out" />
              
              <div className="h-16 w-16 bg-gradient-to-br from-secondary to-white border border-secondary shadow-inner flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 rounded-2xl relative z-10">
                <item.icon size={28} strokeWidth={1.2} />
              </div>
              
              <h3 className="text-2xl font-heading font-medium mb-4 text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-base text-gray-500 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;

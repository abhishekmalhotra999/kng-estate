import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/shared/ServiceHero";
import residentialImg from "@/assets/residential.jpg";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const Residential = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".anim-content",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
     tl.fromTo(".anim-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
      "-=0.4"
    );

  }, { scope: container });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ServiceHero
          title="Residential Real Estate"
          subtitle="Find Your Dream Home"
          description="Whether you're a first-time buyer or seasoned homeowner, our team will guide you through every step of the residential real estate process with care and expertise."
          image={residentialImg}
        />
        <section ref={container} className="py-24 px-6 md:py-32">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="anim-content text-3xl md:text-4xl font-heading font-medium mb-6 leading-tight">Your Home Journey Starts Here</h2>
            <p className="anim-content text-muted-foreground leading-relaxed text-lg mb-16 font-light max-w-2xl mx-auto">
              From cozy starter homes to luxury estates, we specialize in matching families with properties that fit their lifestyle and budget. Our deep knowledge of the Surrey and Greater Vancouver market ensures you get the best value.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Market Analysis", desc: "Expert pricing strategy." },
                { title: "Home Staging", desc: "Showcase perfectly." },
                { title: "Negotiation", desc: "Top dollar results." }
              ].map((item) => (
                <div key={item.title} className="anim-card bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-black/10 transition-colors duration-300 group">
                  <h3 className="font-heading font-medium text-lg mb-2 group-hover:text-black/70 transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-500 font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Residential;

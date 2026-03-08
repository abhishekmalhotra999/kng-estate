import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/shared/ServiceHero";
import commercialImg from "@/assets/commercial.jpg";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const Commercial = () => {
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
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
        );

    }, { scope: container });

    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <ServiceHero
            title="Commercial Real Estate"
            subtitle="Invest in Your Future"
            description="From office spaces to retail units, we help businesses and investors find the perfect commercial property to grow and thrive."
            image={commercialImg}
          />
          <section ref={container} className="py-24 px-6 md:py-32">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="anim-content text-3xl md:text-4xl font-heading font-medium mb-6 leading-tight">Smart Commercial Investments</h2>
              <p className="anim-content text-muted-foreground leading-relaxed text-lg font-light max-w-2xl mx-auto">
                Our commercial real estate team brings industry insight and data-driven strategy to every transaction, ensuring you maximize your return on investment.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
};

export default Commercial;

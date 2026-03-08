import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/shared/ServiceHero";
import agriImg from "@/assets/agricultural.jpg";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const Agricultural = () => {
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
            title="Agricultural Land"
            subtitle="Roots in the Land"
            description="Explore vast agricultural opportunities. From farmland to rural estates, we connect you with land that works as hard as you do."
            image={agriImg}
          />
          <section ref={container} className="py-24 px-6 md:py-32">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="anim-content text-3xl md:text-4xl font-heading font-medium mb-6 leading-tight">Land of Opportunity</h2>
              <p className="anim-content text-muted-foreground leading-relaxed text-lg font-light max-w-2xl mx-auto">
                Agricultural land is one of the most stable investments available. Our team understands zoning, soil quality, water rights, and everything you need to make an informed decision.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
};

export default Agricultural;

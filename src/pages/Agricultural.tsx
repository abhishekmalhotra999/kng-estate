import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/shared/ServiceHero";
import agriImg from "@/assets/agricultural.jpg";

const Agricultural = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <ServiceHero
        title="Agricultural Land"
        subtitle="Roots in the Land"
        description="Explore vast agricultural opportunities. From farmland to rural estates, we connect you with land that works as hard as you do."
        image={agriImg}
      />
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">Land of Opportunity</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Agricultural land is one of the most stable investments available. Our team understands zoning, soil quality, water rights, and everything you need to make an informed decision.
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Agricultural;

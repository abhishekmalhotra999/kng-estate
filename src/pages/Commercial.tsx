import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/shared/ServiceHero";
import commercialImg from "@/assets/commercial.jpg";

const Commercial = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <ServiceHero
        title="Commercial Real Estate"
        subtitle="Invest in Your Future"
        description="From office spaces to retail units, we help businesses and investors find the perfect commercial property to grow and thrive."
        image={commercialImg}
      />
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">Smart Commercial Investments</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Our commercial real estate team brings industry insight and data-driven strategy to every transaction, ensuring you maximize your return on investment.
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Commercial;

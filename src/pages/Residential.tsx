import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceHero from "@/components/shared/ServiceHero";
import residentialImg from "@/assets/residential.jpg";

const Residential = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <ServiceHero
        title="Residential Real Estate"
        subtitle="Find Your Dream Home"
        description="Whether you're a first-time buyer or seasoned homeowner, our team will guide you through every step of the residential real estate process with care and expertise."
        image={residentialImg}
      />
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">Your Home Journey Starts Here</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">
            From cozy starter homes to luxury estates, we specialize in matching families with properties that fit their lifestyle and budget. Our deep knowledge of the Surrey and Greater Vancouver market ensures you get the best value.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Market Analysis", "Home Staging", "Negotiation"].map((item) => (
              <div key={item} className="bg-card rounded-4xl p-6 shadow-premium border border-border/50">
                <h3 className="font-heading font-bold mb-2">{item}</h3>
                <p className="text-sm text-muted-foreground">Expert {item.toLowerCase()} services tailored to your needs.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Residential;

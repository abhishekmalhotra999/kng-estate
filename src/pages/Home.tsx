import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ValueSection from "@/components/home/ValueSection";
import AboutTeaser from "@/components/home/AboutTeaser";
import BlogFeed from "@/components/home/BlogFeed";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ValueSection />
        <AboutTeaser />
        <BlogFeed />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

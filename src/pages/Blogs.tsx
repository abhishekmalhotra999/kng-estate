import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const posts = [
  { title: "5 Tips for First-Time Home Buyers in 2025", date: "July 15, 2025", category: "Residential", excerpt: "Navigating the real estate market as a first-time buyer can be overwhelming. Here are our top tips to ensure a smooth experience." },
  { title: "Why Commercial Real Estate is Booming in Surrey", date: "July 10, 2025", category: "Commercial", excerpt: "Surrey is seeing unprecedented growth in the commercial sector. Here's what investors need to know." },
  { title: "Agricultural Land: The Hidden Investment Gem", date: "July 5, 2025", category: "Agricultural", excerpt: "Discover why savvy investors are turning to agricultural land as a long-term wealth strategy." },
  { title: "Understanding Mortgage Rates in Canada", date: "June 28, 2025", category: "Finance", excerpt: "A breakdown of current mortgage rates and what they mean for buyers in 2025." },
  { title: "Home Staging Tips That Sell", date: "June 20, 2025", category: "Selling", excerpt: "Simple staging techniques that can increase your home's value and reduce time on the market." },
  { title: "The Future of Remote Work and Real Estate", date: "June 15, 2025", category: "Trends", excerpt: "How the shift to remote work is reshaping housing demand across British Columbia." },
];

const Blogs = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".blog-header-item",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.2 }
    );
    
    tl.fromTo(".blog-post-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      "-=0.4"
    );

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="blog-header-item text-4xl md:text-5xl font-heading font-medium mb-4">Real Estate Insights</h1>
            <p className="blog-header-item text-muted-foreground text-lg font-light">Stay informed with the latest from the real estate world.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <article
                key={post.title}
                className="blog-post-card group flex flex-col h-full border-b border-gray-100 pb-8 hover:border-black/20 transition-colors duration-500"
              >
                <div className="h-48 bg-gray-50 mb-6 overflow-hidden relative">
                   <div className="absolute top-4 left-4">
                     <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-black/5 text-[10px] font-bold uppercase tracking-widest text-black shadow-sm">
                        {post.category}
                     </span>
                   </div>
                   {/* Placeholder for image */}
                   <div className="w-full h-full bg-gray-100 group-hover:scale-105 transition-transform duration-700"></div>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">
                    <Calendar size={12} /> {post.date}
                  </div>
                  <h3 className="text-xl font-heading font-medium mb-3 group-hover:text-black/60 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 font-light">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black group-hover:text-black/60 transition-colors cursor-pointer group-hover:translate-x-1 duration-300">
                      Read Article <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;

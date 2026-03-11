import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const posts = [
  {
    title: "5 Tips for First-Time Home Buyers in 2025",
    date: "July 15, 2025",
    category: "Residential",
    excerpt:
      "Navigating the real estate market as a first-time buyer can be overwhelming. Here are our top tips to ensure a smooth experience.",
  },
  {
    title: "Why Commercial Real Estate is Booming in the Tricity",
    date: "July 10, 2025",
    category: "Commercial",
    excerpt:
      "The Tricity region is seeing unprecedented growth in the commercial sector. Here's what investors need to know.",
  },
  {
    title: "Agricultural Land: The Hidden Investment Gem",
    date: "July 5, 2025",
    category: "Agricultural",
    excerpt:
      "Discover why savvy investors are turning to agricultural land as a long-term wealth strategy.",
  },
  {
    title: "Understanding Market Trends in Chandigarh",
    date: "June 28, 2025",
    category: "Market",
    excerpt:
      "A breakdown of current market trends and what they mean for buyers and sellers in the Tricity.",
  },
  {
    title: "Home Staging Tips That Sell",
    date: "June 20, 2025",
    category: "Selling",
    excerpt:
      "Simple staging techniques that can increase your home's value and reduce time on the market.",
  },
  {
    title: "The Future of Remote Work and Real Estate",
    date: "June 15, 2025",
    category: "Trends",
    excerpt:
      "How the shift to remote work is reshaping housing demand across the region.",
  },
];

const Blogs = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero
      gsap.fromTo(
        ".blog-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.3 }
      );

      const words = gsap.utils.toArray(".blog-title-word") as HTMLElement[];
      gsap.fromTo(
        words,
        { y: 60, opacity: 0, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.4,
        }
      );

      gsap.fromTo(
        ".blog-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut", transformOrigin: "left", delay: 0.7 }
      );

      gsap.fromTo(
        ".blog-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.9 }
      );

      // Blog cards — scroll scrub
      const cards = gsap.utils.toArray(".blog-card") as HTMLElement[];
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 70%",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="min-h-screen bg-[#FCFBF8] text-gray-900">
      <Header />
      <main>
        {/* ─── Hero ─── */}
        <section className="relative pt-36 md:pt-44 pb-20 px-6 md:px-12 lg:px-20 xl:px-28 overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#c9a96e]/[0.03] blur-[150px] rounded-full pointer-events-none" />

          <div className="container mx-auto">
            <div className="max-w-3xl">
              <span className="blog-eyebrow inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.35em] uppercase text-[#c9a96e] mb-6">
                <span className="block w-8 h-[1px] bg-[#c9a96e]/50" />
                Journal
              </span>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-medium leading-[1.05] mb-8"
                style={{ perspective: "800px" }}
              >
                {["Real", "Estate"].map((w, i) => (
                  <span key={i} className="blog-title-word inline-block mr-[0.25em]">
                    {w}
                  </span>
                ))}
                <br />
                <span className="blog-title-word inline-block mr-[0.25em] italic font-light text-[#c9a96e]">
                  Insights
                </span>
                {["&", "Stories"].map((w, i) => (
                  <span
                    key={i}
                    className="blog-title-word inline-block mr-[0.25em] text-gray-600"
                  >
                    {w}
                  </span>
                ))}
              </h1>

              <div className="blog-line w-16 h-[2px] bg-[#c9a96e] mb-8" />

              <p className="blog-desc text-lg text-gray-600 font-light leading-relaxed max-w-xl">
                Stay informed with the latest market analysis, investment
                strategies, and real estate wisdom from the KNG team.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Blog Grid ─── */}
        <section className="bg-white px-6 md:px-12 lg:px-20 xl:px-28 py-32">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
              {posts.map((post, index) => {
                const num = String(index + 1).padStart(2, "0");
                return (
                  <article
                    key={post.title}
                    className="blog-card group relative flex flex-col border border-black/[0.05] bg-black/[0.02] hover:border-[#c9a96e]/20 hover:bg-black/[0.03] transition-all duration-700 cursor-pointer"
                  >
                    {/* Top bar */}
                    <div className="p-6 pb-0">
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-heading text-3xl font-light text-[#c9a96e]/60 group-hover:text-[#c9a96e]/60 transition-colors duration-500 select-none">
                          {num}
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="text-gray-900/15 group-hover:text-[#c9a96e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500"
                        />
                      </div>

                      <span className="inline-block px-3 py-1 border border-[#c9a96e]/15 text-[9px] font-bold tracking-[0.2em] uppercase text-[#c9a96e]/80 mb-4">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col p-6 pt-0">
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-3">
                        <Calendar size={10} /> {post.date}
                      </div>

                      <h3 className="text-lg font-heading font-medium mb-3 text-gray-900 group-hover:text-[#c9a96e] transition-colors duration-500 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed mb-6 font-light">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto">
                        <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 group-hover:text-[#c9a96e] transition-all duration-500">
                          Read Article
                          <ArrowRight
                            size={10}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </span>
                      </div>
                    </div>

                    {/* Bottom gold line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9a96e]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;

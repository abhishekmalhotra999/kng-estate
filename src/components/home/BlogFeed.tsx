import { useRef } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const posts = [
  {
    title: "5 Tips for First-Time Home Buyers in 2025",
    date: "July 15, 2025",
    excerpt: "Navigating the real estate market as a first-time buyer can be overwhelming. Here are our top tips.",
    category: "Residential",
  },
  {
    title: "Why Commercial Real Estate is Booming in Surrey",
    date: "July 10, 2025",
    excerpt: "Surrey is seeing unprecedented growth in the commercial sector. Here's what investors need to know.",
    category: "Commercial",
  },
  {
    title: "Agricultural Land: The Hidden Investment Gem",
    date: "July 5, 2025",
    excerpt: "Discover why savvy investors are turning to agricultural land as a long-term wealth strategy.",
    category: "Agricultural",
  },
];

const BlogFeed = () => {
  const container = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    tl.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    
    tl.fromTo(".blog-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.6"
    );

  }, { scope: container });

  return (
    <section ref={container} className="py-24 px-6 bg-white">
      <div className="container mx-auto">
        <div 
          ref={titleRef}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 opacity-0 translate-y-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-medium mb-2">What's Going On?</h2>
            <p className="text-muted-foreground font-light">Latest insights from the real estate world.</p>
          </div>
          <Link
            to="/blogs"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors group"
          >
            View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div ref={postsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article
              key={post.title}
              className="blog-card bg-card group border-b border-border hover:border-black transition-colors duration-500 pb-8 flex flex-col h-full"
            >
              <div className="relative mb-6 overflow-hidden">
                <div className="h-64 bg-gray-100 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-black/5 text-[10px] font-bold uppercase tracking-widest text-foreground shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">
                  <Calendar size={12} />
                  {post.date}
                </div>
                <h3 className="text-xl font-heading font-medium mb-3 group-hover:text-black/70 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed font-light">{post.excerpt}</p>
                
                <div className="mt-auto pt-4">
                  <Link
                    to="/blogs"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-black/70 transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Read Article <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogFeed;

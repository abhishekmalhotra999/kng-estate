import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

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
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">What's Going On?</h2>
            <p className="text-muted-foreground">Latest insights from the real estate world.</p>
          </div>
          <Link
            to="/blogs"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
          >
            View All <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-4xl overflow-hidden shadow-premium border border-border/50 group hover:shadow-premium-hover transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-accent/10 to-secondary flex items-center justify-center">
                <span className="px-4 py-1.5 rounded-full bg-card text-xs font-medium text-foreground shadow-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar size={14} />
                  {post.date}
                </div>
                <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  Continue Reading <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogFeed;

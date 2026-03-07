import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  { title: "5 Tips for First-Time Home Buyers in 2025", date: "July 15, 2025", category: "Residential", excerpt: "Navigating the real estate market as a first-time buyer can be overwhelming. Here are our top tips to ensure a smooth experience." },
  { title: "Why Commercial Real Estate is Booming in Surrey", date: "July 10, 2025", category: "Commercial", excerpt: "Surrey is seeing unprecedented growth in the commercial sector. Here's what investors need to know." },
  { title: "Agricultural Land: The Hidden Investment Gem", date: "July 5, 2025", category: "Agricultural", excerpt: "Discover why savvy investors are turning to agricultural land as a long-term wealth strategy." },
  { title: "Understanding Mortgage Rates in Canada", date: "June 28, 2025", category: "Finance", excerpt: "A breakdown of current mortgage rates and what they mean for buyers in 2025." },
  { title: "Home Staging Tips That Sell", date: "June 20, 2025", category: "Selling", excerpt: "Simple staging techniques that can increase your home's value and reduce time on the market." },
  { title: "The Future of Remote Work and Real Estate", date: "June 15, 2025", category: "Trends", excerpt: "How the shift to remote work is reshaping housing demand across British Columbia." },
];

const Blogs = () => (
  <div className="min-h-screen">
    <Header />
    <main className="pt-28 pb-24 px-6">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Real Estate Insights</h1>
          <p className="text-muted-foreground text-lg">Stay informed with the latest from the real estate world.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-4xl overflow-hidden shadow-premium border border-border/50 group hover:shadow-premium-hover transition-all duration-300"
            >
              <div className="h-44 bg-gradient-to-br from-accent/10 to-secondary flex items-center justify-center">
                <span className="px-4 py-1.5 rounded-full bg-card text-xs font-medium shadow-sm">{post.category}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar size={14} /> {post.date}
                </div>
                <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-accent transition-colors">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors cursor-pointer">
                  Continue Reading <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Blogs;

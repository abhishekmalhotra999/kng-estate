import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { User, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Authentication coming soon!");
  };

  const inputClass =
    "w-full px-6 py-4 rounded-2xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all duration-300";

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-24 px-6 flex items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-5xl shadow-premium border border-border/50 p-8 md:p-12 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <User size={28} />
            </div>
            <h1 className="text-2xl font-heading font-bold">Welcome Back</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your KNG Estate account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputClass} pl-14`}
                required
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pl-14`}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-primary/10"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

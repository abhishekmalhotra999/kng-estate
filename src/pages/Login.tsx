import { useState, useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { User, Lock } from "lucide-react";
import { toast } from "sonner";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".login-box",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, { scope: container });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Authentication coming soon!");
  };

  const inputClass =
    "w-full px-6 py-4 bg-gray-50 border border-gray-200 text-black placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all duration-300 font-light";

  return (
    <div ref={container} className="min-h-screen bg-gray-50/50">
      <Header />
      <main className="pt-32 pb-24 px-6 flex items-center justify-center min-h-[80vh]">
        <div
          className="login-box bg-white shadow-xl border border-gray-100 p-8 md:p-12 w-full max-w-md opacity-0"
        >
          <div className="text-center mb-10">
            <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 text-black border border-gray-200">
              <User size={28} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-heading font-medium mb-2">Welcome Back</h1>
            <p className="text-sm text-muted-foreground font-light">Sign in to your KNG Estate account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputClass} pl-12`}
                required
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pl-12`}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-white text-gray-900 text-xs font-bold uppercase tracking-widest hover:bg-white/80 transition-all active:scale-[0.99] shadow-lg shadow-black/5 mt-4"
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

import { useState, useEffect, useRef } from "react";
import { Cookie } from "lucide-react";
import gsap from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const CookieBanner = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const accepted = localStorage.getItem("kng-cookies-accepted");
    if (!accepted) {
      setShouldRender(true);
    }
  }, []);

  useGSAP(() => {
    if (shouldRender) {
      gsap.fromTo(bannerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.5, ease: "power3.out" }
      );
    }
  }, [shouldRender]);

  const handleClose = (accepted: boolean) => {
    if (accepted) {
      localStorage.setItem("kng-cookies-accepted", "true");
    }
    
    gsap.to(bannerRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => setShouldRender(false)
    });
  };

  if (!shouldRender) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:max-w-md z-50 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 opacity-0 translate-y-24"
    >
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 text-black">
          <Cookie size={20} />
        </div>
        <div>
          <p className="text-sm text-gray-500 leading-relaxed mb-4 font-light">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleClose(true)}
              className="px-6 py-2 text-xs font-bold uppercase tracking-widest bg-white text-gray-900 hover:bg-white/80 transition-opacity"
            >
              Accept
            </button>
            <button
              onClick={() => handleClose(false)}
              className="px-6 py-2 text-xs font-bold uppercase tracking-widest bg-transparent border border-gray-200 text-black hover:bg-gray-50 transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;

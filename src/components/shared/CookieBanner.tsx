import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("kng-cookies-accepted");
    if (!accepted) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("kng-cookies-accepted", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 bg-card rounded-4xl shadow-premium border border-border/50 p-6"
        >
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Cookie size={20} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={accept}
                  className="px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                >
                  Accept
                </button>
                <button
                  onClick={() => setShow(false)}
                  className="px-5 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-full hover:bg-muted transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;

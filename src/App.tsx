import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Residential from "./pages/Residential";
import Commercial from "./pages/Commercial";
import Agricultural from "./pages/Agricultural";
import Rentals from "./pages/Rentals";
import SellProperty from "@/pages/SellProperty";
import OurTeam from "./pages/OurTeam";
import OurApproach from "./pages/OurApproach";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SmoothScroll from "./components/shared/SmoothScroll";

const CookieBanner = lazy(() => import("./components/shared/CookieBanner"));
const ChatBubble = lazy(() => import("./components/shared/ChatBubble"));

const queryClient = new QueryClient();

type FrontendDebugEntry = {
  time: string;
  event: string;
  payload?: Record<string, unknown>;
};

declare global {
  interface Window {
    __KNG_FRONTEND_DEBUG__?: FrontendDebugEntry[];
    __kngCheckApi?: () => Promise<void>;
  }
}

const pushFrontendDebug = (event: string, payload?: Record<string, unknown>) => {
  const entry: FrontendDebugEntry = {
    time: new Date().toISOString(),
    event,
    payload,
  };

  const existing = window.__KNG_FRONTEND_DEBUG__ ?? [];
  window.__KNG_FRONTEND_DEBUG__ = [...existing.slice(-49), entry];

  if (payload) {
    console.log(`[kng-frontend] ${event}`, payload);
    return;
  }

  console.log(`[kng-frontend] ${event}`);
};

const App = () => {
  useEffect(() => {
    const verifyNodeApi = async () => {
      const endpoints = ["/api/health", "/health"];

      pushFrontendDebug("api-check:start", {
        location: window.location.href,
        userAgent: navigator.userAgent,
        endpoints,
      });

      try {
        for (const endpoint of endpoints) {
          pushFrontendDebug("api-check:request", { endpoint });
          const response = await fetch(endpoint, {
            method: "GET",
            cache: "no-store",
          });

          const contentType = response.headers.get("content-type") || "unknown";
          const rawBody = await response.clone().text();

          pushFrontendDebug("api-check:response", {
            endpoint,
            status: response.status,
            ok: response.ok,
            contentType,
            bodyPreview: rawBody.slice(0, 220),
          });

          if (!response.ok) {
            continue;
          }

          if (!contentType.includes("application/json")) {
            pushFrontendDebug("api-check:non-json-success", { endpoint, contentType });
            continue;
          }

          const data = await response.json();
          pushFrontendDebug("api-check:json", {
            endpoint,
            ok: Boolean(data?.ok),
            message: data?.message,
          });

          if (data?.ok) {
            window.alert("Node API is working");
            pushFrontendDebug("api-check:success", { endpoint });
            return;
          }
        }

        pushFrontendDebug("api-check:failed-all-endpoints", { endpoints });
      } catch (error) {
        pushFrontendDebug("api-check:error", {
          message: error instanceof Error ? error.message : "unknown error",
        });
      }
    };

    window.__kngCheckApi = verifyNodeApi;
    pushFrontendDebug("api-check:hook-registered", {
      manualCommand: "window.__kngCheckApi()",
      dumpCommand: "window.__KNG_FRONTEND_DEBUG__",
    });

    verifyNodeApi();

    return () => {
      delete window.__kngCheckApi;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SmoothScroll />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/residential" element={<Residential />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/sell-property" element={<SellProperty />} />
            <Route path="/commercial" element={<Commercial />} />
            <Route path="/agricultural" element={<Agricultural />} />
            <Route path="/team" element={<OurTeam />} />
            <Route path="/approach" element={<OurApproach />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Suspense fallback={null}>
            <CookieBanner />
            <ChatBubble />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

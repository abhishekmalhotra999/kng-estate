import { Suspense, lazy } from "react";
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

const App = () => (
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

export default App;

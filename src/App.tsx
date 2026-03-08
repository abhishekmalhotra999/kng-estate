import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Residential from "./pages/Residential";
import Commercial from "./pages/Commercial";
import Agricultural from "./pages/Agricultural";
import OurTeam from "./pages/OurTeam";
import OurApproach from "./pages/OurApproach";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import CookieBanner from "./components/shared/CookieBanner";
import ChatBubble from "./components/shared/ChatBubble";
import SmoothScroll from "./components/shared/SmoothScroll";

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
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/agricultural" element={<Agricultural />} />
          <Route path="/team" element={<OurTeam />} />
          <Route path="/approach" element={<OurApproach />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
        <ChatBubble />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

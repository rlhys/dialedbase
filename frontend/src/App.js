import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import KPI from "./components/KPI";
import Testimonials from "./components/Testimonials";
import Globe from "./components/Globe";
import Founder from "./components/Founder";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import About from "./pages/About";
import Work from "./pages/Work";
import { Toaster } from "./components/ui/sonner";
import useSmoothScroll from "./hooks/useSmoothScroll";
import { ContactProvider } from "./components/ContactFlow";
import { useEffect } from "react";

const Home = () => (
  <>
    <Hero />
    <Services />
    <KPI />
    <Testimonials />
    <Globe />
    <Founder />
    <FinalCTA />
  </>
);

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/work" element={<PageWrapper><Work /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const Shell = () => {
  useSmoothScroll();
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <ScrollToTop />
      <main className="relative">
        <AnimatedRoutes />
        <Footer />
      </main>
      <Toaster position="bottom-center" theme="dark" />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ContactProvider>
          <Shell />
        </ContactProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

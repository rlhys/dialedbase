import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import KPI from "./components/KPI";
import Process from "./components/Process";
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

// Admin
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Clients from "./admin/pages/Clients";
import ClientDetail from "./admin/pages/ClientDetail";
import Payments from "./admin/pages/Payments";
import Settings from "./admin/pages/Settings";
import SaveCard from "./pay/SaveCard";
import Checkout from "./pay/Checkout";

const Home = () => (
  <>
    <Hero />
    <Services />
    <KPI />
    <Process />
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

const PublicShell = () => {
  useSmoothScroll();
  return (
    <ContactProvider>
      <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
        <Navbar />
        <ScrollToTop />
        <main className="relative">
          <AnimatedRoutes />
          <Footer />
        </main>
      </div>
    </ContactProvider>
  );
};

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin/login" element={<Login />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Dashboard />} />
      <Route path="clients" element={<Clients />} />
      <Route path="clients/:id" element={<ClientDetail />} />
      <Route path="payments" element={<Payments />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </Routes>
);

const PayRoutes = () => (
  <Routes>
    <Route path="/pay/save-card/:token" element={<SaveCard />} />
    <Route path="/pay/checkout/:token" element={<Checkout />} />
  </Routes>
);

const AppRoutes = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return <AdminRoutes />;
  if (pathname.startsWith("/pay")) return <PayRoutes />;
  return <PublicShell />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Toaster position="bottom-center" theme="dark" />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import KPI from "./components/KPI";
import Testimonials from "./components/Testimonials";
import Globe from "./components/Globe";
import Founder from "./components/Founder";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import useSmoothScroll from "./hooks/useSmoothScroll";

const Home = () => {
  useSmoothScroll();
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <main className="relative">
        <Hero />
        <Services />
        <KPI />
        <Testimonials />
        <Globe />
        <Founder />
        <FinalCTA />
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
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

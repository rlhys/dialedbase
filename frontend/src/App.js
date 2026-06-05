import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import Services from "./components/Services";
import KPI from "./components/KPI";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import Bloom from "./components/Bloom";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import SideRail from "./components/SideRail";
import { Toaster } from "./components/ui/sonner";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <SideRail />
      <main className="relative">
        <Hero />
        <Showcase />
        <Services />
        <KPI />
        <Testimonials />
        <Team />
        <Bloom />
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

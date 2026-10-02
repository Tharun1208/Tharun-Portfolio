import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative min-h-screen bg-[#07080c] text-slate-100 selection:bg-indigo-600 selection:text-white">
      {/* Top Floating Navigation */}
      <Navbar />

      {/* Main Experience Stream */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Minimal Signature Footer */}
      <Footer />
    </div>
  );
}

export default App;
import About from "@/components/About";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Team from "@/components/Team";
import { CTA, Footer } from "@/components/CTAAndFooter";

// Import your existing components below (keep whatever you already have)
// import Hero from "@/components/Hero";
// import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      {/* ── Your existing Navbar + Hero go here ── */}
      {/* <Navbar /> */}
      {/* <Hero /> */}

      {/* ── New sections ── */}
      <About />
      <Features />
      <HowItWorks />
      <Team />
      <CTA />
      <Footer />
    </main>
  );
}

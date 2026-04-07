// Home.jsx
import React from "react";
import EmbeddedProjectsMap from "@/components/EmbeddedProjectsMap";
import FeaturedLegalServices from "./components/FeaturedLegalServices";
import Services from "./components/Services";
import CTA from "./components/CTA";
import LandingShell from "./components/LandingShell";
import Partners from "./components/Partners";
import WhyWithUs from "./components/WhyWithUs";
import FAQ from "./components/FAQ";

function Home() {
  return (
    <>
      <LandingShell />
      <Partners />
      <div className="relative bg-white">
        <EmbeddedProjectsMap />
        <WhyWithUs />
        <CTA />
        <Services />
        <FeaturedLegalServices />
        <FAQ />
      </div>
    </>
  );
}

export default Home;

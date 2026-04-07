import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Preloader from "@/components/feedback/Preloader";
import ScrollToTop from "@/components/navigation/ScrollToTop";
import RouteScrollReset from "@/components/router/RouteScrollReset";
import { AppReadyContext } from "@/context/AppReadyContext";

let hasBootedApp = false;

function MainLayout({ children }) {
  const [isReady, setIsReady] = useState(hasBootedApp);

  useEffect(() => {
    if (isReady) {
      hasBootedApp = true;
    }
  }, [isReady]);

  // Lock scroll while preloader is active
  useEffect(() => {
    if (!isReady) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [isReady]);

  return (
    <AppReadyContext.Provider value={isReady}>
      {!isReady && <Preloader onDone={() => setIsReady(true)} />}
      <RouteScrollReset />
      <div
        className={[
          "relative isolate min-h-screen flex flex-col text-slate-900 transition-opacity duration-300",
          isReady ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <Navbar />
        <main className="flex-1">
          <SmoothScroll>{children ?? <Outlet />}</SmoothScroll>
        </main>
        <Footer />
        {isReady && <ScrollToTop />}
      </div>
    </AppReadyContext.Provider>
  );
}

export default MainLayout;

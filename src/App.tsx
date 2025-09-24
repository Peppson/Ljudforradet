import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { AlertProvider } from "./context/AlertProvider";
import DebugBreakpoints from "./utils/DebugBreakpoints";
import StartupModal from "./components/StartupModal";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import config from "./config/Config";

export default function App() {
  const [isStartup, setIsStartup] = useState(false);
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Should we show StartupModal?
  useEffect(() => {
    const hasShownStartup = localStorage.getItem(config.startupModalStorageKey);
    const shouldShowModal = !hasShownStartup || config.showStartupModalOverride; // Override
    setIsStartup(shouldShowModal);
  }, []);

  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  return <>
    <AuthProvider>
      <AlertProvider>

        {isStartup && <StartupModal onClose={() => { setIsStartup(false); }} />}
        {config.showBootstrapBreakpoints && <DebugBreakpoints />}

        {!isAdminRoute && <Header />}
        <Main isVideoPlaying={!isStartup} />
        <Footer />

      </AlertProvider>
    </AuthProvider >
  </>;
};

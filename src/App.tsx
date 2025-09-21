import BootstrapBreakpoints from "./utils/BootstrapBreakpoints";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { AlertProvider } from "./context/AlertProvider";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import config from "./config/Config";

export default function App() {
  const isAdminRoute = location.pathname.startsWith("/admin");

  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  return <>
    <AuthProvider>
      <AlertProvider>
        {!isAdminRoute && <Header />}
        <Main />
        <Footer />
        {config.showBootstrapBreakpoints ? <BootstrapBreakpoints /> : null}
      </AlertProvider>
    </AuthProvider >
  </>;
};

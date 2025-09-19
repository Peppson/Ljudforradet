import BootstrapBreakpoints from './utils/BootstrapBreakpoints';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { AuthProvider } from "./context/AuthProvider";
import config from "./config/Config";

export default function App() {
  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  return <>
    <AuthProvider>
      <Header />
      <Main />
      <Footer />
      {config.showBootstrapBreakpoints ? <BootstrapBreakpoints /> : null}
    </AuthProvider>
  </>;
};

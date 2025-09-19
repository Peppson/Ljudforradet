import type { JSX } from 'react';
import StartPage from './pages/StartPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/AdminPage';
import { useApi } from "./hooks/useApi";

interface Route {
  element: JSX.Element;
  path: string;
  menuLabel?: string;
  loader?: Function;
}

const { getFetch } = useApi();

const routes: Route[] = [
  { element: <StartPage />, path: '/', menuLabel: 'Start' },
  { element: <ProductsPage />, path: '/products', menuLabel: 'Utrustning', loader: async () => await getFetch("api/products") },
  { element: <AboutPage />, path: '/about-us', menuLabel: 'Om oss' },
  { element: <LoginPage />, path: '/login', menuLabel: 'Logga in' },
  { element: <NotFoundPage />, path: '*' },

  {
    element: <AdminPage />, path: '/admin', menuLabel: 'Admin',
    loader: async () => {
      const gear = await getFetch("api/products");
      const users = await getFetch("api/users");
      return { gear, users };
    }
  }
];

export default routes;

import type { JSX } from 'react';
import StartPage from './pages/StartPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage';

interface Route {
  element: JSX.Element;
  path: string;
  menuLabel?: string;
}

const routes: Route[] = [
  { element: <StartPage />, path: '/', menuLabel: 'Start' },
  { element: <ProductsPage />, path: '/products', menuLabel: 'Utrustning' },
  { element: <AboutPage />, path: '/about-us', menuLabel: 'Om oss' },
  { element: <LoginPage />, path: '/login', menuLabel: 'Logga in' },
  { element: <NotFoundPage />, path: '*' }
];

export default routes;

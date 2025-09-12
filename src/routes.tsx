import type { JSX } from 'react';
import StartPage from './pages/StartPage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage';

interface Route {
  element: JSX.Element;
  path: string;
  menuLabel?: string;
}

const routes: Route[] = [
  { element: <StartPage />, path: '/', menuLabel: 'Home' },
  { element: <ProductsPage />, path: '/products', menuLabel: 'Products' },
  { element: <AboutPage />, path: '/about-us', menuLabel: 'About us' },
  { element: <AboutPage />, path: '/login', menuLabel: 'Login' },
  { element: <NotFoundPage />, path: '*' }
];

export default routes;

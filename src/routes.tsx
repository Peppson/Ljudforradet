import type { JSX } from "react";
import { useApi } from "./hooks/useApi";
import StartPage from "./pages/StartPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminRouteWrapper from "./components/Admin/AdminRouteWrapper";

interface Route {
  element: JSX.Element;
  path: string;
  menuLabel?: string;
  loader?: Function;
}

const { getFetch } = useApi();

const routes: Route[] = [
  {
    element: <StartPage />,
    path: "/",
    menuLabel: "Start"
  },
  {
    element: <ProductsPage />,
    path: "/products",
    menuLabel: "Utrustning",
    loader: async () => {
      const gear = await (await getFetch("api/products"))!.json();
      return { gear: gear };
    }
  },
  {
    element: <AboutPage />,
    path: "/about-us",
    menuLabel: "Om oss"
  },
  {
    element: <LoginPage />,
    path: "/login",
    menuLabel: "Logga in"
  },
  {
    element: <AdminRouteWrapper />,
    path: "/admin",
    menuLabel: "Admin",
    loader: async () => {
      const gear = await (await getFetch("api/products"))!.json();
      const users = await (await getFetch("api/users"))!.json();
      const orders = await (await getFetch("api/orders"))!.json();
      const orderItems = await (await getFetch("api/orderItems"))!.json();
      return { gear, users, orders, orderItems };
    }
  },
  {
    element: <NotFoundPage />,
    path: "*"
  }
];

export default routes;

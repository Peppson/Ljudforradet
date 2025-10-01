import type { JSX } from "react";
import { useApi } from "./hooks/useApi";
import { forceCorrectType } from "./utils/Utilities";
import StartPage from "./pages/StartPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPageWrapper from "./components/Admin/AdminPageWrapper";
import OrderPage from "./pages/OrderPage";

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
    element: <AboutPage />,
    path: "/about-us",
    menuLabel: "Om oss"
  },
  {
    element: <ProductsPage />,
    path: "/products",
    menuLabel: "Utrustning",
    loader: async () => {
      const gear = await (await getFetch("api/products"))!.json();
      const typeSafeGear = forceCorrectType(gear);
      return { gear: typeSafeGear };
    }
  },
  {
    element: <LoginPage />,
    path: "/login",
    menuLabel: "Logga in"
  },
  {
    element: <AdminPageWrapper />,
    path: "/admin",
    menuLabel: "Admin",
    loader: async () => {
      const [gear, users, orders, orderItems] = await Promise.all([
        (await getFetch("api/products"))!.json(),
        (await getFetch("api/users"))!.json(),
        (await getFetch("api/orders"))!.json(),
        (await getFetch("api/orderItems"))!.json(),
      ]);

      return { gear, users, orders, orderItems };
    }
  },



  {
    element: <OrderPage />,
    path: "/order/:id",
    loader: async ({ params }: { params: { id: string } }) => {

      const order = await (await getFetch(`/api/orders/${params.id}`))!.json();

      return { order };
    }
  },


  {
    element: <NotFoundPage />,
    path: "*"
  }
];

export default routes;

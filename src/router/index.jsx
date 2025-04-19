import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Layout";
import Error from "../pages/Error";
// import Home from "../pages/Home";
// import Product from "../pages/Product";
// import ProductDetails from "../pages/ProductDetails";
// import Cart from "../pages/Cart";
// import Checkout from "../pages/Checkout";
// import Orders from "../pages/Orders";
// import AddProduct from "../pages/AddProduct";
// import Edit from "../pages/Edit";
// import Profile from "../pages/Profile";
// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";

import { store } from "../store";
import { addProductLoader, checkoutLoader, editLoader, homeLoader, ordersLoader, productLoader } from "./loaders/loaders";
import { loginAction, registerAction } from "./actions";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";


const Home = lazy(() => import("../pages/Home"));
const Product = lazy(() => import("../pages/Product"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Orders = lazy(() => import("../pages/Orders"));
const AddProduct = lazy(() => import("../pages/AddProduct"));
const Edit = lazy(() => import("../pages/Edit"));
const Profile = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "products",
        element: <Product />,
        loader: productLoader,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        loader: checkoutLoader(store),
      },
      {
        path: "orders",
        element: <Orders />,
        loader: ordersLoader(store),
      },
      {
        path: "products/add",
        element: <AddProduct />,
        loader: addProductLoader(store),
      },
      {
        path: "products/edit/:id",
        element: <Edit />,
        loader: editLoader(store),
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "login",
    element: (
        <Suspense fallback={<Loading />}>
            <Login />
        </Suspense>
    ),
    action: loginAction(store),
  },
  {
    path: "register",
    element: <Register />,
    action: registerAction(store),
  },
]);

export default router;

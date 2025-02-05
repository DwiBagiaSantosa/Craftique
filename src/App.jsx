import React, { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { delayForLoading } from "./utils/index.jsx";

// Pages
const Layout = lazy(() => delayForLoading(import("./layouts/Layout")));
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ProductDetails = lazy(() => delayForLoading(import("./pages/ProductDetails")));
const Checkout = lazy(() => import("./pages/Checkout"));
const Cart = lazy(() => import("./pages/Cart"));

// Loader
import { loader as homeLoader } from "./pages/Home.jsx"
import { loader as productLoader } from "./pages/Product.jsx"
import { loader as checkoutLoader } from "./pages/Checkout.jsx"

// Action
import { action as RegisterAction } from "./pages/auth/Register.jsx"
import { action as LoginAction } from "./pages/auth/Login.jsx"

// Store
import { store } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, saveCart } from "./features/cartSlice.js";

import Loading from "./components/Loading.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
        loader: homeLoader
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<Loading />}>
            <Product />
          </Suspense>
        ),
        loader: productLoader
      },
      {
        path: "products/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<Loading />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<Loading />}>
            <Checkout />
          </Suspense>
        ),
        loader: checkoutLoader(store)
      }
    ]
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
    action: LoginAction(store)
  },
  {
    path: "register",
    element: (
      <Suspense fallback={<Loading />}>
        <Register />
      </Suspense>
    ),
    action: RegisterAction(store)
  }
])

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userState.user)
  const cartState = useSelector((state) => state.cartState);
  console.log("🚀 ~ App ~ cartState:", cartState)

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart(user._id)).catch((error) => {
        console.error("Failed to fetch cart:", error);
        // Optionally show a toast or error message to the user
      });
    }
  }, [dispatch, user])

  useEffect(() => {
    if (user?._id && cartState.cartItems.length > 0) {
      dispatch(saveCart({ userId: user._id, ...cartState }))
    }
  }, [dispatch, cartState, user])

  return (
    <RouterProvider 
      router={router} 
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_skipActionErrorRevalidation: true
      }}
   />
  )
}

export default App

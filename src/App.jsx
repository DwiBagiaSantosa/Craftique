import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { delayForLoading } from "./utils/index.jsx";

// Pages
import Layout from"./layouts/Layout"
import Home from "./pages/Home";
import Product from  "./pages/Product";
import Login from  "./pages/auth/Login";
import Register from  "./pages/auth/Register";
import ProductDetails from  "./pages/ProductDetails";
import Checkout from  "./pages/Checkout";
import Cart from  "./pages/Cart";
import Orders from  "./pages/Orders";
import AddProduct from  "./pages/AddProduct";
import Edit from "./pages/Edit.jsx";
import Error from "./pages/Error.jsx";

// Loader
import { loader as homeLoader } from "./pages/Home.jsx"
import { loader as productLoader } from "./pages/Product.jsx"
import { loader as checkoutLoader } from "./pages/Checkout.jsx"
import { loader as ordersLoader } from "./pages/Orders.jsx"
import { loader as addProductLoader } from "./pages/AddProduct.jsx"
import { loader as editLoader } from "./pages/Edit.jsx"

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
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader
      },
      {
        path: "products",
        element: <Product />,
        loader: productLoader
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
        loader: checkoutLoader(store)
      },
      {
        path: "orders",
        element: <Orders />,
        loader: ordersLoader(store)
      },
      {
        path: "products/add",
        element: <AddProduct />,
        loader: addProductLoader(store)
      },
      {
        path: "products/edit/:id",
        element: <Edit />,
        loader: editLoader(store)
      }
    ]
  },
  {
    path: "login",
    element: <Login />,
    action: LoginAction(store)
  },
  {
    path: "register",
    element: <Register />,
    action: RegisterAction(store)
  }
])

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userState.user)
  const cartState = useSelector((state) => state.cartState);
  // console.log("🚀 ~ App ~ cartState:", cartState)

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

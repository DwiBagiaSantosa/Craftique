import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProductDetails from "./pages/ProductDetails";

// Loader
import { loader as homeLoader } from "./pages/Home.jsx"
import { loader as productLoader } from "./pages/Product.jsx"
// import { loader as similiarProductLoader } from "./pages/ProductDetails.jsx"

// Action
import { action as RegisterAction } from "./pages/auth/Register.jsx"
import { action as LoginAction } from "./pages/auth/Login.jsx"

// Store
import { store } from "./store";
import Cart from "./pages/Cart.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart, initializeCart, saveCart } from "./features/cartSlice.js";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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

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
import { initializeCart } from "./features/cartSlice.js";



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

  useEffect(() => {
    //  initialize the cart when the app loads
    const userId = user?._id;
    dispatch(initializeCart({ userId }))
  }, [dispatch, user])

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

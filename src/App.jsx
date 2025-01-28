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

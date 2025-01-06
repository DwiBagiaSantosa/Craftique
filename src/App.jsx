import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Loader

import { loader as homeLoader } from "./pages/Home.jsx"

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
        element: <Product />
      }
    ]
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "register",
    element: <Register />
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App

import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "products",
        element: <Product />
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App

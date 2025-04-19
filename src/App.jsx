import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchCart, saveCart } from "./features/cartSlice.js";

import router from "./router/index.jsx";

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

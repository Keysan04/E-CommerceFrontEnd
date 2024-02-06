import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/sign-in-up/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import SignIn from "./pages/sign-in-up/SignIn";
import VerifyEmail from "./pages/sign-in-up/VerifyEmail";
import ResetPassword from "./pages/sign-in-up/ResetPassword";
import { PrivateRoute } from "./components/private-layout/PrivateRoute";
import Category from "./pages/category/Category";
import { useDispatch } from "react-redux";
import { getCategories, getProducts } from "./pages/profile/userAction";
import { useEffect } from "react";
import MyProfile from "./pages/profile/MyProfile";
import Home from "./pages/home/Home";
import ProductLandingPage from "./pages/product/ProductLandingPage";
import Cart from "./pages/cart/Cart";
import { Checkout } from "./pages/checkout/Checkout";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        {/* // <Route path="/signin" element={<SignIn />} /> */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:_id" element={<ProductLandingPage />} />
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;

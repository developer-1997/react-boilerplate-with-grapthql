import React from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./components/header/Header";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/Signup/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { PrivateRoute } from "./components/header/privateRoute/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const { pathname } = useLocation();
  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
  return (
    <div className="App">
      {!pathname.includes("register") &&
        !pathname.includes("signin") &&
        !pathname.includes("forgotPassword") && (
          <Header isLoggedIn={isLoggedIn} />
        )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard />{" "}
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

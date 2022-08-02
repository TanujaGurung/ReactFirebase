import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from "./utils/AuthProvider";
import LanguageSelector from "./LanguageSelector";

function App() {
  return (
    <AuthProvider>
      <div className="app">
      <LanguageSelector />
        <BrowserRouter>
        <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
            </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
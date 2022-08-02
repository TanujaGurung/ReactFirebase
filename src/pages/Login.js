import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const { t } = useTranslation()

  const handleSubmit = async(e) => {
    e.preventDefault();
      try {
        const data = await signInWithEmailAndPassword(auth, email, password)
       console.log("data", data)
        if (data !== undefined) {
            setError(false)
            navigate("/home")
        }
    } catch (err) {
        if (err instanceof Error) {
          console.log("error", error)
            setError(true)
        }
    }
  };
  const handleForgot =()=>{
    navigate("/forgot-password")
  }

  return (
    <div>
      <h1>{t("welcome_login")}</h1>
      {error && <p>either email or password is wrong, try again</p>}
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button>{t("login")}</button>
      </form><a href="#" onClick={handleForgot}>Forgot Password</a>
      <div></div>
      <div>
        <p>Don't have an account? <a href="#" style={{textDecoration:"none"}} onClick={()=>navigate("/signup")}>create now</a></p>
      </div>
    </div>
  );
};

export default Login;
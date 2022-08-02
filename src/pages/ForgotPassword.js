import React, { useState } from "react"
import {sendPasswordResetEmail} from "firebase/auth"
import {auth} from "../Firebase/firebase"
import {useNavigate} from "react-router-dom"

const ForgotPassword=()=>{
    const [email, setEmail] = useState("")
    const navigate=useNavigate()
    const submitHandle = async (e) => {
        e.preventDefault();
        try {
          await sendPasswordResetEmail(auth, email);
        //   setErr("");
          navigate("/");
        } catch (err) {
          console.log(err.message);
        }
      };
    return(
        <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        <button onClick={submitHandle}>Submit</button>
        </div>
    )
}
export default ForgotPassword
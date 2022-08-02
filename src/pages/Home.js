import React, { useState, useContext, useEffect } from "react";
import { auth } from "../Firebase/firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth'
import AddData from "./AddData"
import DataTable from "./DataTable";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const [show, setShow] = useState(false)
  const [user, setUser] = useState({})
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) =>
    {
      setUser(currentUser)
          })
    return () => unsubscribe()
  }, [])

  const clickLogin = () => {
    if (currentUser) {
      signOut(auth);
      setUser({})
      navigate("/");
    } else {
      
    }
  };

  const clickSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="mainContainer">
      <h1>Home</h1>
      <div>
      Welcome: {user?.email} 
      </div>
      <div className="buttons">
        <button onClick={clickLogin}>
          {currentUser ? "Log Out" : "Login"}
        </button>
        {!currentUser && <button onClick={clickSignup}>Sign Up</button>}
      </div>
      <br/>
      {!show && <button onClick={()=>{setShow(true)}}>Add Data to Db</button>} 
      <br/>
      {show && <AddData reresh={refresh} setRefresh={setRefresh}/>}
      <br/>
      <br/>
      <div><h3>Data Table</h3>
      <DataTable refresh={refresh} setRefresh={setRefresh}/>
      </div>

    </div>
  );
}

export default Home;
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase/firebase'
import { collection, addDoc } from 'firebase/firestore'
 // import axios from "axios";

const AddData = (props) => {
  const { refresh, setRefresh} = props;
  // console.log("props", props)

    const [title, setTitle] = useState()
    // const [id, setId] = useState("");
    const [lat, setLat]= useState(0);
    const [long, setLong] = useState(0);
    useEffect(()=>{
      navigator.geolocation.getCurrentPosition((position)=>{
     setLat(position.coords.latitude);
     setLong(position.coords.longitude);
      })
    },[])


     const handleSubmit = async (e)=>{
         e.preventDefault();
            if (title!== "")
            e.preventDefault();
            try {
              const data = await addDoc(collection(db, "Data"), {
                Name: title,
                id: "14",
                Location: {
                  _lat: lat,
                  _log: long,
                },
                Date: new Date().getTime()
                })
             
          } catch (err) {
              if (err instanceof Error) {
                console.log("error", err)
    
              }
          }
          setRefresh(!refresh)
     }
  
    return (
        <>
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                    
                <input type="text" placeholder="enter Name" defaultValue={title} onChange={(e)=>setTitle(e.target.value) } />
                </div><div>
                    <button >Add</button>
                 
                </div>
            </form>
            </div>
          
   </>
  )
}
export default AddData;
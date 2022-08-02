import React, { useState } from 'react'
import { db } from '../Firebase/firebase'
import { collection, addDoc } from 'firebase/firestore'
 // import axios from "axios";

const AddData = (props) => {
  const { refresh, setRefresh} = props;
  // console.log("props", props)

    const [title, setTitle] = useState()
    // const [id, setId] = useState("");
    // const [latitude, setLat]= useState(0);
    // const [longitude, setLong] = useState(0);
    // const geolocationAPI = navigator.geolocation;

    // const getUserCoordinates = () => {
    //     if (!geolocationAPI) {
    //       console.log('Geolocation API is not available in your browser!')
    //     } else {
    //       geolocationAPI.getCurrentPosition((position) => {
    //         const { coords } = position;
    //         setLat(coords.latitude);
    //         setLong(coords.longitude);
    //       }, (error) => {
    //         console.log('Something went wrong getting your position!')
    //       })
    //     }
    // }
// const [user, setUser] = useState({})
//    useEffect(() => {
//     let unsubscribe = onAuthStateChanged(auth, (currentUser) =>
//   {
//     setUser(currentUser)
//     })
//   return () => unsubscribe()
// }, [])

// useEffect(()=>{
//     getUserLocationFromAPI();
// },[])



     const handleSubmit = async (e)=>{
         e.preventDefault();
            if (title!== "")
            e.preventDefault();
            try {
              const data = await addDoc(collection(db, "Data"), {
                Name: title,
                id: "14",
                Location:[
                    "38 N,52 E",
                ],
                Date: new Date().getTime()
                })
             
          } catch (err) {
              if (err instanceof Error) {
                console.log("error", err)
    
              }
          }
          setRefresh(!refresh)
     }

     // 97fc89f5e4f640d9820386db234553ec

//      const apiURL = 'https://ipgeolocation.abstractapi.com/v1/'
// const apiKey = '97fc89f5e4f640d9820386db234553ec';
 
// // 192.168.0.125
//  const getUserLocationFromAPI = async() => {
//    try {
//      const response = await axios.get('https://api.ipgeolocation.io/ipgeo?ip=192.168.0.125', {api_key: "97fc89f5e4f640d9820386db234553ec"});
//      console.log(response.data);
//      setLat(response.data.latitude);
//      setLong(response.data.longitude);
//    } catch (error) {
//     console.log('Something went wrong getting Geolocation from API!')
//    }
//  }
  
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
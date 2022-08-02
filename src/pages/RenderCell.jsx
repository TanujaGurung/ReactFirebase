import React, { FC } from "react"
import {default as Delete}  from "./Delete"
import { db } from '../Firebase/firebase'
import { deleteDoc, doc} from 'firebase/firestore'


const RenderCell = ({refresh,setRefresh, id }) => {
    const handleDelete = async()=>{
        // console.log("id", id)
        try{
          await deleteDoc(doc(db, "Data", id))
          setRefresh(!refresh)
        }
        catch (err) {
          if (err instanceof Error) {
            console.log("error", err)
        
          }
        }
        }
        return(
    <div onClick={handleDelete}><Delete /></div>)
        }
export default RenderCell
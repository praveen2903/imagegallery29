import { useState } from "react"
import { db } from "../firebase/config"
import { useEffect } from "react"

const UseFireStore = (collection) => {
    const [docs,setDocs]=useState([])
    useEffect(()=>{
        const unsub=db.collection(collection).orderBy('createdAt','desc')
    })
  return (
    {docs}
  )
}

export default UseFireStore
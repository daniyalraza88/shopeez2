import { useState,useEffect} from "react"
import { doc } from "firebase/firestore"
import { db } from "../config/firebase"
import { getDoc } from "firebase/firestore"
import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router"

function Profile() {

    const navigate = useNavigate()

    const [userName1,setUsername] = useState("")
    const [userEmail,setUseremail] = useState("")
    const [userPhone,setUserphone] = useState("")

    useEffect(()=>{

        const userNamesRef = doc(db, "users",auth.currentUser.uid)
        // alert("data")
        const getUserData = async()=>{
            const userData = await getDoc(userNamesRef)
            // console.log(userData.data().image)

            setUseremail(userData.data().email)
            setUsername(userData.data().name)
            setUserphone(userData.data().phone)
            

        }
        getUserData();

    },[])


    return <div>
        <button onClick={async()=>{await signOut(auth); navigate("/")}}> sign out </button>



        <h1> Welcome back {userName1} </h1>
        <h1>Email: {userEmail}</h1>
        <h1> Phone Number: {userPhone} </h1>
    </div>
}

export {Profile}

import { deleteDoc } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router"
import { auth } from "../config/firebase"
import { db } from "../config/firebase"
import { getDoc , doc} from "firebase/firestore"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { collection } from "firebase/firestore"
import { addDoc } from "firebase/firestore"
import { getDownloadURL,uploadBytes } from "firebase/storage"
import { storage } from "../config/firebase"
import { ref } from "firebase/storage"
import { where } from "firebase/firestore"
import { getDocs } from "firebase/firestore"
import { query } from "firebase/firestore"



function Sellerdashboard(){

    const [Title, setTitle] = useState("")
    const [Price, setPrice] = useState("")
    const [Description, setDescription] = useState("")
    const [Images, setImages] = useState([]);
    const [myProducts,setMyproducts] = useState([])
    const [imageUrls, setImageUrls] = useState([])
    let imgArr = [];



    
    const navigate = useNavigate()
    async function addProduct(){
    // console.log(title,price,description,images)
    const ProductsCollectionref = collection(db, "ads")
    const uid = auth.currentUser.uid;
    const email = auth.currentUser.email;


    if (Title == "" || Price == "" || Description == "" ) {
        // console.log("error")
        alert("Please fill all the fields")
        // console.log(images)
    } else if(Description.length<15){
        alert("please breifly describe your product with atleast 40 characters")
    } else if(Description.length>40){
        alert("Please keep the description short and precise")

    } else
    {
        try {
            const a = Images.length;
            console.log("length"+Description.length)
            for (let i = 0; i < a; i++) {
                const imgRef = ref(storage, `productImages/${Math.random()}`)
                const upl = await uploadBytes(imgRef, Images[i])
                const imageUrl = await getDownloadURL(upl.ref)
                imgArr.push(imageUrl)
                // console.log(imgArr)
            }

            // let finalArr = [...imgArr]
            let newPrice = Number(Price)



            await addDoc(ProductsCollectionref, { title: Title, price: newPrice, description: Description, images: imgArr, sellerid:uid })
            alert("product added")

        } catch(err){
            alert(err)
        }
    }





    setDescription("")
    setPrice("")
    setTitle("")
    
    }

    async function deleteAd(ind) {
        console.log(ind)

        const documentId = ind; // replace with your document ID
        const documentRef = doc(db, 'ads', documentId);
        deleteDoc(documentRef)
            .then(() => {
                alert('Document deleted successfully');
                // props.setScreen("dashboard")
                // navigate("/")
            })
            .catch((error) => {
                alert('Error deleting document:', error);
            });
        }

    
    const uid  = auth.currentUser.uid
    const q = query(collection(db, "ads"), where("sellerid", "==", uid));
    const myadsArr = []

    useEffect(()=>{

        const getData = async () => {
            try {

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {

                    myadsArr.push({ data: doc.data(), id: doc.id })

                });

                setMyproducts(myadsArr)
                console.log(myProducts.data.title)


            }
            catch (err) {
                console.log(err)
            }
        }

        getData();

    },[])




    return <div> This is seller dashboard eeeee

       
        <Button onClick={async()=>{await signOut(auth); navigate("/") } }> sign out </Button>
        <br></br> <br></br>
        <input placeholder="Product Title" value={Title} onChange={(e)=>{setTitle(e.target.value)}} />
        <br></br> <br></br>
        <textarea placeholder="description" required minLength={40} value={Description} onChange={(e)=>{setDescription(e.target.value)}} ></textarea>   <br></br> <br></br>
        <input type="file" multiple onChange={(e)=>{setImages(e.target.files)}} />  <br></br> <br></br>
        <input placeholder="Price" value={Price} onChange={(e)=>{setPrice(e.target.value)}} />
        <br></br>
        <Button onClick={addProduct} > Add Product </Button>

        <br></br>

        <br></br>
        <h2> My Products </h2>

        {
            myProducts.map((val,ind)=>{
               return <div id='uniqueProduct' > {val.data.title} {val.data.description}

               {val.data.images.map((val,ind)=>{
                  return <img style={{height:"50px"}} src={val} id='productImages' />
               })}
               
                  {val.data.price} <Button onClick={()=>{deleteAd(val.id)}} style={{color:"red"}} > Delete </Button> </div>
            })
        } 

        <h5>Product 1 <Button>delete</Button> </h5>
        <h5>Product 2 <Button>delete</Button> </h5>
        <h5>Product 3 <Button>delete</Button> </h5>
        <h5>Product 4 <Button>delete</Button> </h5>

    </div>

}

export {Sellerdashboard}
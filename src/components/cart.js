import { Link } from "react-router-dom";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { Button } from "@mui/material";
import { doc,getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { clear } from "../store/actions";

import { PURGE } from "redux-persist";

import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    } from "mdb-react-ui-kit";
    import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { persistor } from "../store";


function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [cart1,setCart1] = useState([])
    const [products,setProducts] = useState([])
    const reduxState = useSelector((state)=>state);

    let reduxValue = useSelector((state)=>state.CartReducer.value)
    console.log(reduxValue)
    console.log(reduxValue)
    const ProductsCollectionref = collection(db, "ads")

    
    let arr = []
    let toggle = true;
    const [data,setData] = useState([])
    
    // useEffect(()=>{

    //     reduxValue.map((val,ind)=>{
    //         const docRef = doc(db, "ads", val);
    //         const getData = async () => {
    //                 const docSnap = await getDoc(docRef);
    //                 // console.log(docSnap.data())
    //                 arr.push(docSnap.data())
    //                 console.log(arr)
    //                 // setProducts(products => [...products,docSnap.data()])
                    
    //                 //     console.log(docSnap.data().Images)
    //                 //     setAddata(docSnap.data())
    //                 //     setImages(docSnap.data().Images)
    //                 //     // setImages(adData.Images)
    //                 setProducts(arr)
    //             }
                
    //             getData();
    
        
    
    //     })

   
        

    //     // setCart1(reduxValue)
    //     console.log(reduxValue)
    //     //  const getData = async () => {
    //     // try {
    //         // const data = await getDocs(ProductsCollectionref)
    //         // const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //         // console.log(filteredData)



    //         // let arr = []
    //         // filteredData.map((val,ind)=>{
    //         //     // console.log(val.id)
    //         //     reduxValue.map((val1,ind1)=>{
    //         //         if(val.id == val1){
    //         //             console.log(val)
    //         //             // arr = [...arr]
    //         //             setProducts([...arr])
    //         //             arr.push(val)
    //         //             // setProducts(products=>[...products,val])
    //         //             // arr.push(val)
    //         //             setProducts(arr)
    //         //             // setProducts(products=>[...products,val])
    //         //             // arr.push(val)
    //         //             // setProducts(arr)
    //         //         }

    //         //     })




    //     console.log(products)
    //     console.log(arr)


    //     // const getData = async () => {
    //     //     const docSnap = await getDoc(docRef);
    //     //     console.log(docSnap.data())
    //     //     console.log(docSnap.data().Images)
    //     //     setAddata(docSnap.data())
    //     //     setImages(docSnap.data().Images)
            
    //     //     // setImages(adData.Images)
    //     // }
        
    //     // getData();





            



    //         // })
    //         // console.log(filteredData)
    //         // console.log(cart1)
    //         // console.log(products)
    //         // console.log(reduxValue)

    //         // setProducts(filteredData)
    //         // keyDown()
    //         // console.log(dbads)
    //         // }
    //     //     catch (err) {
    //     //         console.log(err)
    //     //     }
    //     // }

    //     // getData();
    //     // console.log(dbads)


  

    // },[])
    
    let total = 0
    const [total1,setTotal1] = useState()
    useEffect(() => {
        const fetchData = async () => {
          const arr = []; // Define an empty array to store the fetched data
          for (const val of reduxValue) {
            const docRef = doc(db, "ads", val);
            const docSnap = await getDoc(docRef);
            arr.push(docSnap.data());
            // console.log(val.price)
            // typeof(12)
            let a = docSnap.data().price
            let b = Number(a)
            console.log(typeof(docSnap.data().price))
            Number(docSnap.data().price)
            total = total+b
            setTotal1(total)
            console.log(total)

          }
          setProducts(arr); // Set the products state after all data is fetched
        };
      
        fetchData(); // Call the async function to fetch data
      
      
      }, []);
      function checkout1(){
        alert("Your order has been placed")
        // persistor.dispatch(PURGE())
        dispatch(clear())
        reduxValue = []
        setProducts([])
        setTotal1(0)
        // persistor.purge()
        // navigate("/")
      } 
    return <div>
<button onClick={()=>{ persistor.purge() }} > purge  </button>

       

        {/* {
            products.map((val,ind)=>{
                return <h1> {val.price}  </h1>
            })
        } */}

        {/* <button onClick={()=>{console.log(products)}} > products </button> */}
       




<section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
  <MDBContainer className="py-5 h-100">
    <MDBRow className="justify-content-center align-items-center h-100">
      <MDBCol>
        <MDBCard>
          <MDBCardBody className="p-4">
            <MDBRow>
              <MDBCol lg="7">
                <MDBTypography tag="h5">
                  <a href="#!"  className="text-body"  > <Link to={"/"} >  
                    <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue
                    shopping
                    </Link>
                  </a>
                </MDBTypography>

                <hr/>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="mb-1">Shopping cart</p>
                   
                  </div>
                  <div>
                    <p>
                      <span className="text-muted">Sort by:</span>
                      <a href="#!" className="text-body">
                        price
                        <MDBIcon fas icon="angle-down mt-1" />
                      </a>
                    </p>
                  </div>
                </div>


                {
            products.map((val,ind)=>{
                
                return <div> 
                    {/* <img src={val.images[0]} /> */}
                    
                    

                    <MDBCard className="mb-3">
                  <MDBCardBody>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <div>
                          <MDBCardImage
                            src={val.images[0]}
                            fluid className="rounded-3" style={{ width: "65px" }}
                            alt="Shopping item" />
                        </div>
                        <div className="ms-3">
                          <MDBTypography tag="h5">
                            {val.title}
                          </MDBTypography>
                          <p className="small mb-0"> {val.description}
</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <div style={{ width: "50px" }}>
                          <MDBTypography tag="h5" className="fw-normal mb-0">
                            
                          </MDBTypography>
                        </div>
                        <div style={{ width: "80px" }}>
                          <MDBTypography tag="h5" className="mb-0">
                            {val.price}
                          </MDBTypography>
                        </div>
                        <a href="#!" style={{ color: "#cecece" }}>
                          <MDBIcon fas icon="trash-alt" />
                        </a>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
                



                    
                    
                    
                      </div>
            })
        }
               



                
              </MDBCol>

              <MDBCol lg="5">
                <MDBCard className="bg-primary text-white rounded-3">
                  <MDBCardBody>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <MDBTypography tag="h5" className="mb-0">
                        Card details
                      </MDBTypography>
                      <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                        fluid className="rounded-3" style={{ width: "45px" }} alt="Avatar" />
                    </div>

                    <p className="small">Card type</p>
                    <a href="#!" type="submit" className="text-white">
                      <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                    </a>
                    <a href="#!" type="submit" className="text-white">
                      <MDBIcon fab icon="cc-visa fa-2x me-2" />
                    </a>
                    <a href="#!" type="submit" className="text-white">
                      <MDBIcon fab icon="cc-amex fa-2x me-2" />
                    </a>
                    <a href="#!" type="submit" className="text-white">
                      <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                    </a>

                    <form className="mt-4">
                      <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg"
                        placeholder="Cardholder's Name" contrast />

                      <MDBInput className="mb-4" label="Card Number" type="text" size="lg"
                        minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast />

                      <MDBRow className="mb-4">
                        <MDBCol md="6">
                          <MDBInput className="mb-4" label="Expiration" type="text" size="lg"
                            minLength="7" maxLength="7" placeholder="MM/YYYY" contrast />
                        </MDBCol>
                        <MDBCol md="6">
                          <MDBInput className="mb-4" label="Cvv" type="text" size="lg" minLength="3"
                            maxLength="3" placeholder="&#9679;&#9679;&#9679;" contrast />
                        </MDBCol>
                      </MDBRow>
                    </form>

                    <hr />

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Subtotal</p>
                      <p className="mb-2">{total1}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Shipping</p>
                      <p className="mb-2">Rs. 200.00</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Total(Incl. taxes)</p>
                      <p className="mb-2">Rs. {total1+200}</p>
                    </div>
                    {/* <Button onClick={()=>{alert("Your order has been placed!")}} > Checkout </Button> */}
                    <Button id="checkout"  onClick={checkout1}> Checkout </Button>
                    

                    <MDBBtn >
                      {/* <div className="d-flex justify-content-between">
                        
                        <span onClick={()=>{alert("Your order has been placed")}} >
                          Checkout{" "}
                          <i className="fas fa-long-arrow-alt-right ms-2"></i>
                        </span>
                      </div> */}
                      {/* <Button onClick={()=>{alert("Your order has been placed!")}} > Checkout </Button> */}
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</section>



    </div>
}

export {Cart}
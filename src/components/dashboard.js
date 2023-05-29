import { Navbar, Nav, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import { Button } from '@mui/material';
import { db } from '../config/firebase';
import { useEffect } from 'react';
import { collection } from 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { AddtoCart } from '../store/actions';



import {
    MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
  } from 'mdb-react-ui-kit';

import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getDocs } from 'firebase/firestore';
import { persistor } from '../store';
 

function Dashboard() {
    const dispatch = useDispatch()
    const [products,setProducts] = useState([])
    const navigate = useNavigate();
    const [showBasic, setShowBasic] = useState(false);
    const ProductsCollectionref = collection(db, "ads")
    const [cart,setCart] = useState([])
    const [search,setSearch] = useState("")

  function setSearchFunction(e){
    console.log(search)
    let finalArr = [];
        // console.log("search")
        // console.log(searchAd)
        products.map((val,ind)=>{
            
            if(val.title.includes(search)){
                finalArr.push(val)
                // finalArr = [...finalArr,val]
            }
            setProducts(finalArr)
            // console.log(val.Title.includes(searchAd))
        })
  }
   
  var tempCart = []
    function addTocart(id){
        let already = false
        cart.map((val,ind)=>{
            if(val == id) {
                already =  true;
            }
        })
        if(!already){

            dispatch(AddtoCart(id))
            setCart(cart=>[...cart,id])
        } else{
            alert("The item is already added in your cart")
        }
        // tempCart.push(id)
        // setCart(tempCart)
        console.log(cart)
}

    useEffect(() => {

        // console.log("use effect chala")
        const getData = async () => {
        try {
            const data = await getDocs(ProductsCollectionref)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            // console.log(filteredData)
            setProducts(filteredData)
            // keyDown()
            // console.log(dbads)
            }
            catch (err) {
                console.log(err)
            }
        }

        getData();
        // console.log(dbads)


    }, [])





    return <div>

        

{/* <button onClick={()=>{ persistor.purge() }} > purge  </button> */}
       

    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand >Shopeez</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page'   >
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink  onClick={()=>{navigate("/cart")}} >cart</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Dropdown
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link onClick={()=>{navigate("/login")}} >Login</MDBDropdownItem>
                  <MDBDropdownItem link onClick={()=>{navigate("/sellerLogin")}} >Sell with Shopeez</MDBDropdownItem>
                  <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink  tabIndex={-1} onClick={()=>{navigate("/profile")}} >
                My Profile
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' onChange={(e)=>{setSearch(e.target.value)}} placeholder='Type query' aria-label='Search' />
            {/* <MDBBtn color='primary'>Search</MDBBtn> */}
            <Button onClick={setSearchFunction} > Search </Button>
          </form>
          
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    

       {/* <button id="cartButt" onClick={()=>{navigate("/cart")}} > My cart </button>
        <button id="signup" onClick={()=>{navigate("/signup")}} > Signup </button>
        <button id="login" onClick={()=>{navigate("/login")}} > Login </button>
        <button id="my profile" onClick={()=>{navigate("/profile")}} > My Profile </button> */}


        <div>
      

      <Carousel>
        
        <Carousel.Item>
            
          <img
            className="d-block w-100" style={{height:"300px"}} 
            src="https://www.shutterstock.com/image-illustration/3d-rendering-luxury-bedroom-interior-260nw-1674405064.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100" style={{height:"300px"}} 
            src="data:image/jpeg;base64,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"
            alt="Second slide"
          />

          <Carousel.Caption>
            {/* <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100" style={{height:"300px"}} 
            src="https://img.freepik.com/premium-psd/headphone-brand-product-sale-facebook-cover-banner_161103-93.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            {/* <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Product and price layout */}
      {/* Add your code for product and price layout here */}
    </div>



<br></br>
{/* <div className='container' >

            <MDBCard  className='ad' >
      <MDBCardImage style={{height:"200px", width:"200px", margin:"10px auto"}} src='https://mdbootstrap.com/img/new/standard/nature/182.webp' alt='...' position='top' />
      <MDBCardBody>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>

        <Button> Add to cart </Button>
        
      </MDBCardBody>
    </MDBCard>
            

           
            <MDBCard  className='ad' >
      <MDBCardImage style={{height:"200px", width:"200px", margin:"10px auto"}} src='https://mdbootstrap.com/img/new/standard/nature/182.webp' alt='...' position='top' />
      <MDBCardBody>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
        <Button> Add to cart </Button>
      </MDBCardBody>
    </MDBCard>
            
            <MDBCard className='ad' >
      <MDBCardImage style={{height:"200px", width:"200px", margin:"10px auto"}} src='https://mdbootstrap.com/img/new/standard/nature/182.webp' alt='...' position='top' />
      <MDBCardBody>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
        <Button> Add to cart </Button>
      </MDBCardBody>
    </MDBCard>
          
    <MDBCard  className='ad' >
      <MDBCardImage style={{height:"200px", width:"200px", margin:"10px auto"}} src='https://mdbootstrap.com/img/new/standard/nature/182.webp' alt='...' position='top' />
      <MDBCardBody>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
        <Button> Add to cart </Button>
      </MDBCardBody>
    </MDBCard>
    

    

    </div> */}


<div className='container' >



    {
            products.map((val,ind)=>{
                return <div className='ad' >


<MDBCard>
    <h3> {val.title} </h3>
      <MDBCardImage style={{height:"200px", width:"200px", margin:"10px auto"}} src={val.images} alt='...' position='top' />
      <MDBCardBody>

        <div id='adText'>
        <MDBCardText  >
            <div id='adOnlyText' >

        {val.description}
            </div>
        </MDBCardText>
        <div style={{color:"orange"}}>
        Rs. {val.price} <br></br>
        </div>
        </div>
        

        <Button onClick={()=>{
            addTocart(val.id)
        }} > Add to cart </Button> 
        <br></br>
        
      </MDBCardBody>
    </MDBCard>

                {/* {val.images.map((val,ind)=>{
                   return <img src={val} id='productImages' />
                })} */}
                
                  </div>
            })
    }
</div>
       
    </div>
}

export {Dashboard}
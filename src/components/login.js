
// import { TextField,Button } from "@mui/material"
// import { Button } from "@mui/material"
// import { Button } from "@mui/material"
// import { Button } from "@mui/material"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc,setDoc } from 'firebase/firestore';




// import * as mdb from 'mdb-ui-kit'; 
// import { Input } from 'mdb-ui-kit'; // module
// import { createPopper, detectOverflow } from '@popperjs/core';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from "@mui/material"
import { MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox} from 'mdb-react-ui-kit'
import { auth,db } from '../config/firebase';





function Login() {
    const [signupUsername,setSignupUsername] = useState("")
    const [signupPhonenumber,setSignupPhonenumber] = useState("")
    const [signupPassword,setSignupPassword] = useState("")
    const [signupEmail,setSignupEmail] = useState("")

    const [signinPassword,setSigninPassword] = useState("")
    const [signinEmail,setSigninEmail] = useState("")
    
    
    async function signup(){
        console.log(signupPassword,signupEmail)
        try{
            await createUserWithEmailAndPassword(auth,signupEmail,signupPassword)
            const usersCollectionRef =  doc(db, "users", auth.currentUser.uid)
            const uid = auth.currentUser.uid;
            await setDoc(usersCollectionRef, { email:signupEmail,name: signupUsername, phone:signupPhonenumber,picture:""})
            navigate("/")



        }
         catch(err){
            console.log(err)
         }
    }

    async function signin(){
        // console.log(signinUsername,signinPassword,signinPhonenumber,signinEmail)
        try{
          await  signInWithEmailAndPassword(auth,signinEmail,signinPassword)
            navigate("/")

        } catch (err){
            console.log(err)
        }
    }


    const navigate = useNavigate()

    const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

    return <div id='userLogin' >



<MDBContainer className="p-3 my-5 d-flex flex-column w-50">

<MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
  <MDBTabsItem>
    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
      Login
    </MDBTabsLink>
  </MDBTabsItem>
  <MDBTabsItem>
    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
      Register
    </MDBTabsLink>
  </MDBTabsItem>
</MDBTabs>

<MDBTabsContent>

  <MDBTabsPane show={justifyActive === 'tab1'}>

    <div className="text-center mb-3">
      <p>Sign in with:</p>

      <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='facebook-f' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='twitter' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='google' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='github' size="sm"/>
        </MDBBtn>
      </div>

      <p className="text-center mt-3">or:</p>
    </div>

    <MDBInput onChange={(e)=>{setSigninEmail(e.target.value)}} wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
    <MDBInput onChange={(e)=>{setSigninPassword(e.target.value)}} wrapperClass='mb-4' label='Password' id='form2' type='password'/>

    <div className="d-flex justify-content-between mx-4 mb-4">
      <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
      <a href="/www.hotmail.com">Forgot password?</a>
    </div>

    {/* <MDBBtn className="mb-4 w-100" onClick={signin} >Sign in</MDBBtn> */}
    <Button onClick={signin}>Sign in</Button>
    <p className="text-center">Not a member? <a href="#!">Register</a></p>

  </MDBTabsPane>

  <MDBTabsPane show={justifyActive === 'tab2'}>

    <div className="text-center mb-3">
      <p>Sign up with:</p>

      <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='facebook-f' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='twitter' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='google' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
          <MDBIcon fab icon='github' size="sm"/>
        </MDBBtn>
      </div>

      <p className="text-center mt-3">or:</p>
    </div>

    <MDBInput onChange={(e)=>{setSignupUsername(e.target.value)}} wrapperClass='mb-4' label='Name' id='form1' type='text'/>
    <MDBInput onChange={(e)=>{setSignupPhonenumber(e.target.value)}} wrapperClass='mb-4' label='Phone#' id='form1' type='text'/>
    <MDBInput onChange={(e)=>{setSignupEmail(e.target.value)}} wrapperClass='mb-4' label='Email' id='form1' type='email'/>
    <MDBInput onChange={(e)=>{setSignupPassword(e.target.value)}} wrapperClass='mb-4' label='Password' id='form1' type='password'/>

    <div className='d-flex justify-content-center mb-4'>
      <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
    </div>

    {/* <MDBBtn  onClick={signup} >Sign up</MDBBtn> */}
    <Button onClick={signup} >Sign up  </Button>

  </MDBTabsPane>

</MDBTabsContent>

</MDBContainer>




{/* <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Logo</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg"/>

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</MDBBtn>
            <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p>
            <p className='ms-5'>Don't have an account? <a href="#!" class="link-info">Register here</a></p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer> */}



{/* <TextField  id="outlined-basic" label="Email" variant="outlined" size="small" /> <br></br> <br></br>
<TextField  type="password" id="outlined-basic" label="Password" variant="outlined" size="small" /> <br></br> <br></br> */}

    </div>
    
}

export {Login}
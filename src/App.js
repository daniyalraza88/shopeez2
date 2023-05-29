import { auth } from './config/firebase';
import './App.css';
import { Dashboard } from './components/dashboard';
import { Route,Routes } from 'react-router-dom';
import { Cart } from './components/cart';
import { Login } from './components/login';
import { Signup } from './components/signup';
import { Profile } from './components/profile';
import { SellerLogin } from './components/sellerLogin';
import { Sellerdashboard } from './components/sellerDashboard';

import * as mdb from 'mdb-ui-kit'; // lib
import { Input } from 'mdb-ui-kit'; // module
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';


function App() {
  
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/cart' element={<Cart/>} /> 
        <Route path='/login' element={<Login/>} /> 
        <Route path='/signup' element={<Signup/>} /> 
        <Route path='/profile' element={<Profile/>} /> 
        <Route path='/sellerLogin' element={<SellerLogin/>} />
        <Route path='/sellerDashboard' element={<Sellerdashboard/>} />

       </Routes>
    </div>
  );
}

export default App;


// protected routing
// cart complete
// remaining ui
// hosting
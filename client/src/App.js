import './App.css';
import { useState, useEffect } from 'react';
import SignIn from './pages/login/SignIn';
import { BrowserRouter, Routes, Route, Switch, Router } from 'react-router-dom';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';
import VendorHome from './pages/vendorHome/VendorHome';
import Restaurant from './pages/restaurant/Restaurant';
import LandingPage from './pages/landingpage/LandingPage';
import { CookiesProvider, get, useCookies } from 'react-cookie';
import SignInVendor from './pages/signInVendor/SignInVendor';
import Orders from './pages/orders/Orders';

export let JWTTOKEN = null;


function App() {

  return (
    <div className="App">
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<LandingPage />} />
            <Route exact path='/signin' element={<SignIn />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/vendor-home' element={<VendorHome />} />
            <Route exact path='/restaurant/:rId' element={<Restaurant />} />
            <Route exact path='/signin-vendor' element={<SignInVendor />} />
            {/* <SignIn /> */}
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;

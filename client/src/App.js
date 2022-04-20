import './App.css';
import SignIn from './pages/login/SignIn';
import { BrowserRouter, Routes, Route, Switch, Router } from 'react-router-dom';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';
import VendorHome from './pages/vendorHome/VendorHome';
import Restaurant from './pages/restaurant/Restaurant';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/vendor-home' element={<VendorHome />} />
          <Route exact path='/restaurant/:rId' element={<Restaurant />} />
          {/* <SignIn /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

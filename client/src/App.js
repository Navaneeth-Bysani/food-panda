import './App.css';
import SignIn from './pages/login/SignIn';
import { BrowserRouter, Routes, Route, Switch, Router } from 'react-router-dom';
import SignUp from './pages/signup/SignUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          {/* <SignIn /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

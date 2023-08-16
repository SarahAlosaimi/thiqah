import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import RegistrationPage from './components/RegistrationPage';
import Login from './components/LoginPage';
import { useState } from 'react';
import GPpage from "./components/GPpage";
import Profile from "./components/StudentDashBoard"

function App() {
  // const [token, setToken] = useState();
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  return (
    <BrowserRouter>
      <div className="App"> 
        <Routes>
          <Route path="/login" element={<Login />} />
 
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/GPpage" element={< GPpage />} />
          <Route path="/StudentDashBoard" element={< Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

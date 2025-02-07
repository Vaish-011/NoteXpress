import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './components/Login/login'; 
import Create from './components/CreateAccount/create'; 
import Home from './components/Home/Home';
import Feedback from './components/Feedback/Feedback';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/create-account" element={<Create />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

 import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './components/Login/login'; 
import Create from './components/CreateAccount/create'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/create-account" element={<Create />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
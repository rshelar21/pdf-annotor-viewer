import './App.css';
import React from 'react';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Pdfview from './components/Pdfview';



function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/pdf/:id' element={<Pdfview/>}/>
        
      </Routes>
    </Router>
    
    </>
  );
}

export default App;

import React from "react";
import './App.css';
import EmpContainer from "./components/EmpContainer/index";
import Navbar from "./components/Nav";
import { HashRouter } from 'react-router-dom';



function App() {


  return (
    <div>
      <HashRouter basename={process.env.PUBLIC_URL}>
    <div className="App">
      <Navbar />
      <EmpContainer />
    </div>
    </HashRouter>
    </div>
  )
}

export default App;



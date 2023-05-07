import logo from './logo.svg';
import { useEffect, useState, useMemo } from 'react';
import './App.css';
import CustomTable from './components/CustomTable';
import { Route, Routes } from "react-router-dom";
import Email from "./Email";
import Home from "./Home";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/email" element={<Email />}></Route>
      </Routes>
    </div>
  )
};
 



export default App;

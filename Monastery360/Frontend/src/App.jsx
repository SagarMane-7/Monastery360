import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './component/Home/Home.jsx';
import History from './component/History/History.jsx';
import { List_of_Monasteries } from './component/List_of_Monasteries/List_of_Monasteries.jsx';
import List_of_Festivals from './component/List_of_Festivals/List_of_Festivals.jsx';
import Festival from './component/Festival/Festival.jsx';
import Map from './component/Map/Map.jsx';
import Volunteer from './component/Volunteer/Volunteer.jsx';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}



function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/monasteries' element={<List_of_Monasteries/>} />
      <Route path='/festivals' element={<List_of_Festivals/>} />
      <Route path='/festivals/:name' element={<Festival/>} />
      <Route path='/volunteer' element={<Volunteer/>} />
      <Route path='/history' element={<History/>} />
      <Route path='/map' element={<Map/>} />
    
   
    </Routes>


    </BrowserRouter>
  );
}

export default App;

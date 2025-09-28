import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import History from './Pages/History/History.jsx';
import { List_of_Monasteries } from './Pages/List_of_Monasteries/List_of_Monasteries.jsx';
import List_of_Festivals from './Pages/List_of_Festivals/List_of_Festivals.jsx';
import Festival from './Pages/Festival/Festival.jsx';
import Map from './Pages/Map/Map.jsx';
import Volunteer from './Pages/Volunteer/Volunteer.jsx';
import Chatbot from './component/Chatbot/Chatbot.jsx';
import Specific_Monastery from './Pages/Specific_Monastery/Specific_Monastery.jsx';


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
      <Route path='/monasteries/:name' element={<Specific_Monastery/>}/>
      <Route path='/festivals' element={<List_of_Festivals/>} />
      <Route path='/festivals/:name' element={<Festival/>} />
      <Route path='/volunteer' element={<Volunteer/>} />
      <Route path='/history' element={<History/>} />
      <Route path='/map' element={<Map/>} />
    </Routes>
    <Chatbot/>
    </BrowserRouter>
  );
}

export default App;

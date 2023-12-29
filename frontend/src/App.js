import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//user auth pages
import Register from "./User//Register";
import Login from "./User/Login";
//components
import HeaderComponent from './Components/HeaderComponent';
import Feed from './User/Feed';

import { FormProvider } from './User/context/FormContext';

function App() {
  return (
    <BrowserRouter>
<HeaderComponent/>
    <Routes>
    <Route path="/Register" element={<FormProvider><Register /></FormProvider>} />
    <Route path="/" element={<Feed />} />
    <Route path="/Login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;

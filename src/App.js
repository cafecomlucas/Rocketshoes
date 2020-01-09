import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        {/* <Header /> */}
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;

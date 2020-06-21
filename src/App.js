import React, { useState } from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';

import SearchParams from './SearchParams';
import Details from './Details';
import ThemeContext from './ThemeContext';
import NavBar from './NavBar';

const App = () => {
  const theme = useState('#333');

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={theme}>
        <div className='app'>
          <NavBar />

          <Router>
            <SearchParams path='/' />
            <Details path='/details/:id' />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById('root'));

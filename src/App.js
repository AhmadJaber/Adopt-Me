import React, { useState } from 'react';
import { Router, Link } from '@reach/router';

import SearchParams from './SearchParams';
import Details from './Details';
import ThemeContext from './ThemeContext';

const App = () => {
  const theme = useState('peru');

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={theme}>
        <div className='app'>
          <header>
            <Link to='/'>Adopt Me!</Link>
          </header>

          <Router>
            <SearchParams path='/' />
            <Details path='/details/:id' />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

export default App;

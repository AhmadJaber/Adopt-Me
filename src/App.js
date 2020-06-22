import React, { useState, lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router';

import ThemeContext from './ThemeContext';

const Details = lazy(() => import('./Details.js'));
const SearchParams = lazy(() => import('./SearchParams.js'));

const App = () => {
  const theme = useState('peru');

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={theme}>
        <div className='app'>
          <header>
            <Link to='/'>Adopt Me!</Link>
          </header>

          <Suspense fallback={<h1>Nice Ui design for loading</h1>}>
            <Router>
              <SearchParams path='/' />
              <Details path='/details/:id' />
            </Router>
          </Suspense>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById('root'));

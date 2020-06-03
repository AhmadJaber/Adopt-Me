import React from 'react';
import { render } from 'react-dom';
import Pet from './Pet';

const App = () => {
  return (
    <div className='app'>
      <h1>Adopt Me!</h1>
      <Pet name='Luna' animal='Dog' breed='Havanese' />
      <Pet name='Putu' animal='Cat' breed='Stray' />
      <Pet name='Meg' animal='Lion' breed='African' />
    </div>
  );
};

render(<App />, document.getElementById('root'));

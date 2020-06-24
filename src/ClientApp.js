import React from 'react';
import { hydrate } from 'react-dom';

import App from './App';

// anyother browser onlythings

hydrate(<App />, document.getElementById('root'));

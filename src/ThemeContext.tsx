import React, { createContext, useState } from 'react';

const ThemeContext = createContext<[string, (theme: string) => void]>([
  'tomato',
  () => {},
]);

export default ThemeContext;

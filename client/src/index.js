import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/styles.scss';
import RootNavigation from './navigation/RootNavigation.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootNavigation />
  </React.StrictMode>
);


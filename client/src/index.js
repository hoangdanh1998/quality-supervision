import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'primereact/resources/themes/mdc-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

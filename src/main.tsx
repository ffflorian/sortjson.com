import React from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App';
import './style.css';

const container = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

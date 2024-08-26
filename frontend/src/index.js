import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // Ensure the case matches your file name

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

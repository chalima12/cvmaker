import React from 'react';
import ReactDOM from 'react-dom/client'; // Use react-dom/client for React 18
import './index.css'; // Import your global styles
import App from './App'; // Import your main App component

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

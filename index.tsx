
import React from 'react';
import ReactDOM from 'react-dom/client';
// FIX: Correct the import path for the App component to be explicit and relative.
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
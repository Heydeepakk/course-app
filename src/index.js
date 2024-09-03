import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Navbar'; 

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Header buttonText="Course List" buttonLink="/course" />
    <App />
  </React.StrictMode>
);

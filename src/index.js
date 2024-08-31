// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambiar la importación de 'react-dom'
import App from './App';
import './index.css';

// Selecciona el contenedor donde se renderizará la aplicación
const container = document.getElementById('root');

// Crea una raíz y renderiza el componente
const root = ReactDOM.createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

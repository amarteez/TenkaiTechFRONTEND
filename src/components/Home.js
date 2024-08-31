import React from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../img-front/img-home.gif'; // Ruta ajustada según la estructura de carpetas
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-image-container">
                <img src={homeImage} alt="Home" className="home-image" />
            </div>
            <div className="home-text">
                <h2>Tenkai Tech Panamá</h2>
                <p>Explora nuestra colección de productos</p>
                <div className="products-button">
                    <Link to="/products" className="custom-button">Productos</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

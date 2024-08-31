import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Product.css';

const Product = ({ product }) => {
    const { addToCart } = useCart();
    const imageUrl = product.image_url || `https://tenkaitechbackend.onrender.com${product.image}`;

    const handleAddToCart = (product) => {
        addToCart(product);
        const button = document.querySelector(`.product-button[data-id='${product.id}']`);
        if (button) {
            button.classList.add('blink');
            setTimeout(() => {
                button.classList.remove('blink');
            }, 500);
        }
    };

    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <img src={imageUrl} alt={product.name} className="product-image" />
            <p className="product-description">{product.description}</p>
            <div className="product-footer">
                <p className="product-price">${product.price}</p>
                <button 
                    className="product-button" 
                    onClick={() => handleAddToCart(product)}
                    data-id={product.id} // Añadimos un atributo data-id para identificar el botón
                >
                    Añadir
                </button>
                <Link to={`/products/${product.id}`}>
                    <button className="product-button">Info</button>
                </Link>
            </div>
        </div>
    );
};

export default Product;

// src/components/ProductCategory.js
import React from 'react';
import './ProductCategory.css'; // Importa los estilos de la categoría de productos
import ProductList from './ProductList';

const ProductCategory = ({ category }) => {
    return (
        <div className="product-category">
            <h2>{category}</h2>
            <ProductList category={category} />
        </div>
    );
}

export default ProductCategory;

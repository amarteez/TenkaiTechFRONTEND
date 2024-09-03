import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from './Product';
import './ProductList.css';

const ProductList = () => {
    const [productsByCategory, setProductsByCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // URL del backend en Render
            const response = await axios.get('https://tenkaitechbackend.onrender.com/api/products/');
            setProductsByCategory(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products.');
            setLoading(false);
        }
    };

    const categories = Object.entries(productsByCategory);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="product-list-container">
            {categories.length === 0 ? (
                <p>No products available</p>
            ) : (
                categories.map(([categoryId, { category_name, products }]) => (
                    <div key={categoryId} className="category-container">
                        <h2>{category_name}</h2>
                        <div className="product-list">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <Product key={product.id} product={product} />
                                ))
                            ) : (
                                <p>No products in this category</p>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductList;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook para la navegación
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://tenkaitechbackend.onrender.com/api/products/${id}/`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product details.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <p>Loading product details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>No product found.</p>;
    }

    const imageUrl = product.image_url || `https://tenkaitechbackend.onrender.com${product.image}`;

    const handleGoBack = () => {
        navigate('/products'); // Redirige a la página de productos
    };

    return (
        <div className="product-details">
            <h2>{product.name}</h2>
            <img src={imageUrl} alt={product.name} className="product-image" />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={handleGoBack}>Back to Products</button>
        </div>
    );
};

export default ProductDetails;

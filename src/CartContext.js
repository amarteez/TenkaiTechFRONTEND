import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

// Acciones
const ADD_TO_CART = 'ADD_TO_CART';
const SET_CART_ITEMS = 'SET_CART_ITEMS';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Crear contexto de carrito
const CartContext = createContext();

// Reducer para manejar el estado del carrito
const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // Si el producto ya está en el carrito, actualiza la cantidad
            const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex >= 0) {
                const updatedCart = [...state];
                updatedCart[existingItemIndex].quantity += action.payload.quantity;
                return updatedCart;
            }
            // Si el producto no está en el carrito, lo agrega
            return [...state, action.payload];
        case SET_CART_ITEMS:
            return action.payload;
        case REMOVE_FROM_CART:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};

// Proveedor del contexto de carrito
export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('https://tenkaitechbackend.onrender.com/api/cart/');
                dispatch({ type: SET_CART_ITEMS, payload: response.data });
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const addToCart = async (product) => {
        try {
            const response = await axios.post('https://tenkaitechbackend.onrender.com/api/cart/add/', {
                product_id: product.id,
                quantity: 1, // Puedes ajustar la cantidad según sea necesario
            });
            const cartItem = {
                id: response.data.id,
                product_id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1, // Puedes ajustar la cantidad según sea necesario
            };
            dispatch({ type: ADD_TO_CART, payload: cartItem });
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            await axios.post('https://tenkaitechbackend.onrender.com/api/cart/remove/', {
                cart_item_id: cartItemId
            });
            dispatch({ type: REMOVE_FROM_CART, payload: cartItemId });
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const getCartTotal = () => {
        const total = cart.reduce((sum, item) => {
            if (!item.price) {
                console.error('Producto indefinido en carrito:', item);
                return sum;
            }
            return sum + (parseFloat(item.price) * item.quantity);
        }, 0);
        const itbms = total * 0.07;
        return {
            total,
            itbms,
            grandTotal: total + itbms
        };
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para usar el contexto de carrito
export const useCart = () => {
    return useContext(CartContext);
};

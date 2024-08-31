import React from 'react';
import { useCart } from '../CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, getCartTotal } = useCart();
    const { total, itbms, grandTotal } = getCartTotal();

    const generateWhatsAppMessage = () => {
        let message = '¡Hola! Me gustaría comprar los siguientes productos:\n\n';
        cart.forEach(item => {
            message += `- ${item.name} (Quantity: ${item.quantity}, Price: $${item.price})\n`;
        });
        message += `\nTotal: $${total.toFixed(2)}`;
        message += `\nITBMS (7%): $${itbms.toFixed(2)}`;
        message += `\nGrand Total: $${grandTotal.toFixed(2)}`;
        return encodeURIComponent(message); // Codificar mensaje en URL
    };

    const whatsappNumber = '62318361';

    return (
        <div className="cart-container">
            <h2>Carrito de Compras</h2>
            <div className="cart-items-container">
                {cart.length === 0 ? (
                    <p>Tu carrito está vacío</p>
                ) : (
                    cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <h3>{item.name}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price}</p>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <div className="cart-summary">
                    <p>Total: ${total.toFixed(2)}</p>
                    <p>ITBMS (7%): ${itbms.toFixed(2)}</p>
                    <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
                    <a
                        href={`https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whatsapp-button"
                    >
                        Enviar a WhatsApp
                    </a>
                </div>
            )}
        </div>
    );
};

export default Cart;

import React, { useEffect, useState } from 'react';
import logo from '../img-front/img-logo.jpg'; // Ajusta la ruta si es necesario
import './Header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={isFixed ? 'fixed' : ''}>
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <nav className={isOpen ? 'open' : ''}>
                <a href="/">Inicio</a>
                <a href="/products">Productos</a>
                <a href="/cart">Carrito</a>
            </nav>
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
        </header>
    );
};

export default Header;

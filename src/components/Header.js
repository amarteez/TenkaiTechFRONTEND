import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img-front/img-logo.jpg';
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
                <Link to="/">Inicio</Link>
                <Link to="/products">Productos</Link>
                <Link to="/cart">Carrito</Link>
            </nav>
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
        </header>
    );
};

export default Header;

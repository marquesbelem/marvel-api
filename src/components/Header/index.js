import React from "react"; 
import "./style.css";
import { Link } from 'react-router-dom';

const Header = () => (
    <header id="main-header">
        <a href="https://developer.marvel.com/" target="_blank">Marvel API</a>
        <Link to="/">Heroes</Link>
    </header>
);

export default Header;
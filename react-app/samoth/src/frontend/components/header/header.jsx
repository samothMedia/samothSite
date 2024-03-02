// import { useState } from 'react'
import '/src/frontend/App.css'
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <div>
            <header style={{zIndex: '10'}}>
                <NavLink id="about_button" className="header_buttons" to="/about">about.</NavLink>
                <NavLink id="home_button" className="header_buttons" to="/">home.</NavLink>
                <NavLink id="gallery_button" className="header_buttons" to="/gallery">gallery.</NavLink>
            </header>
        </div>
    )
}

export default Header
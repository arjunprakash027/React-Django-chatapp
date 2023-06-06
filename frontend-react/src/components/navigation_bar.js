import React from 'react';
import { useState } from 'react';

function Navbar({ profile, logout }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  
    return (
      <nav>
        <div className="logo">
          <img src={profile['picture']} alt={profile['name']} />
          <h2>Welcome {profile['name']}!</h2>
        </div>
        <div className={`dropdown ${menuOpen ? 'open' : ''}`}>
          <div className="dropdown-button" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className="dropdown-menu">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="profile-info">
          <h3>Mail ID: {profile['email']}</h3>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    );
  }

export default Navbar;
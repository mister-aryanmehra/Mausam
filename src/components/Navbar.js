import React, { useState } from 'react';
import { FaSearch, FaCloudSun, FaLocationArrow } from 'react-icons/fa';

function Navbar({ onSearch, onHomeClick, onCurrentLocation }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      onHomeClick();
    }
  };

  return (
    <nav className="navbar glass-card" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      marginBottom: '2rem',
      borderRadius: '24px',
      border: '1px solid var(--glass-border)'
    }}>
      <a href="/" className="navbar-brand" onClick={(e) => { e.preventDefault(); onHomeClick(); }} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        textDecoration: 'none',
        color: 'var(--text-primary)',
        fontSize: '1.5rem',
        fontWeight: '700'
      }}>
        <FaCloudSun size={32} color="var(--accent-color)" />
        Mausam
      </a>

      <div className="search-container" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        background: 'rgba(0, 0, 0, 0.2)',
        padding: '0.5rem 1rem',
        borderRadius: '16px',
        border: '1px solid var(--glass-border)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <FaSearch color="var(--text-secondary)" />
        <input
          type="text"
          className="search-input"
          placeholder="Search city..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            width: '100%',
            outline: 'none'
          }}
        />
        <button
          className="btn-icon"
          onClick={onCurrentLocation}
          title="Use Current Location"
        >
          <FaLocationArrow />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

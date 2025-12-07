import React, { useState } from 'react';
import './App.css';
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import SearchResult from './components/SearchResult.js';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearchActive(!!query);
  };

  const handleHomeClick = () => {
    setSearchQuery("");
    setIsSearchActive(false);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        handleSearch(`${latitude},${longitude}`);
      }, (error) => {
        alert("Unable to retrieve your location");
      });
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <div className="App" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Navbar
        onSearch={handleSearch}
        onHomeClick={handleHomeClick}
        onCurrentLocation={handleCurrentLocation}
      />
      <div className="main-content">
        {isSearchActive ? (
          <SearchResult query={searchQuery} />
        ) : (
          <Home />
        )}
      </div>
    </div>
  );
}

export default App;

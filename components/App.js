import React from 'react';
import SearchBar from '../containers/SearchBar';
import WeatherList from '../containers/WeatherList';

const App = () => {
    return (
      <div>
        <nav className="navbar navbar-fixed-top navbar-dark bg-primary">
          5 Day Weather Forecast
        </nav>
        <div style={{padding: '3rem 1.5rem'}}>
          <SearchBar />
          <WeatherList />
        </div>
        <nav
          className="navbar navbar-fixed-bottom navbar-light"
          style={{pointerEvents: 'none'}}
        >
          <span style={{color: '#D3D3D3'}}>
          </span>
        </nav>
      </div>
    )
}

export default App;

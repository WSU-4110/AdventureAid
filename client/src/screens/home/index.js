import logo from '../../assets/img/logo.svg';
import './index.scss';

import Navbar from '../../components/navbar';
import WeatherComponent from '../../components/weather';
import LoginPage from '../../components/login/index.js';
import MapComponent from '../../components/maps/googlemaps';


function App() {
  return (
    <>
    <div className="App">
    <Navbar />
  
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <WeatherComponent />
      <LoginPage />
      <MapComponent />
    </div>
     
    </>
  );
}

export default App;

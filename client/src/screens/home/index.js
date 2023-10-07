import logo from '../../assets/img/logo.svg';
import './index.scss';

import Navbar from '../../components/navbar';
import WeatherComponent from '../../components/weather';
import LoginPage from '../../components/login/index.js';
import MapComponent from '../../components/maps/googlemaps';
import TravelAdvisoryComponent from '../../components/travel-advisory';


function App() {
  return (
    <>
    <div className="App">
    <Navbar />
      <WeatherComponent />
      <TravelAdvisoryComponent />
      <LoginPage />
      <MapComponent />
    </div>
     
    </>
  );
}

export default App;

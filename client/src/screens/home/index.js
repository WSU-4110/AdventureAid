import logo from '../../assets/img/logo.svg';
import './index.scss';

import Navbar from '../../components/navbar';
import WeatherComponent from '../../components/weather';
import MapComponent from '../../components/maps/googlemaps';
import TravelAdvisoryComponent from '../../components/travel-advisory';


function App() {
  return (
    <>
    <div className="App">
      <Navbar />
      <WeatherComponent />
      <TravelAdvisoryComponent />
      <MapComponent />

    </div>
     
    </>
  );
}

export default App;

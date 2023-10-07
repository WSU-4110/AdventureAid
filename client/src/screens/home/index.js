import logo from '../../assets/img/logo.svg';
import './index.scss';

import Navbar from '../../components/navbar';
import WeatherComponent from '../../components/weather';
import MapComponent from '../../components/maps/googlemaps';

import LoginScreen from "../login/index.js"

function App() {
  return (
    <>
    <div className="App">
    <Navbar />
    <LoginScreen />
    </div>
     
    </>
  );
}

export default App;

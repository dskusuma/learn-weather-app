import React from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

// OpenWeatherMap API KEY : 
const API_KEY = 'ee185aee02f3686c7535e4447961175b';

// URL BANDUNG : http://api.openweathermap.org/data/2.5/weather?id=1650357&appid=ee185aee02f3686c7535e4447961175b&units=metric

class App extends React.Component {
  getWeather = async (e) => {
    // prevent Default behaviour
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);

    const data = await api_call.json();
    console.log(data);
  }

  render() {
    return (
      <div>
        <Titles />
        <Form getWeather={this.getWeather}/>
        <Weather />
      </div>
    );
  }
}

export default App;
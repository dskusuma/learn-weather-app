import React from 'react';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

// OpenWeatherMap API KEY : 
const API_KEY = 'ee185aee02f3686c7535e4447961175b';

// URL BANDUNG : http://api.openweathermap.org/data/2.5/weather?id=1650357&appid=ee185aee02f3686c7535e4447961175b&units=metric

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    // prevent Default behaviour
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log(data);

    if (city && country) {
      // Don't manipulate directly to the object
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value"
      });
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Titles />
              </div>
              <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather}/>
                <Weather 
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}





export default App;
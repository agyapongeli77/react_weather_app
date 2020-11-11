import React, { Component } from 'react';
import axios from 'axios';
import WeatherData from '../components/WeatherData'
import DailyForecast from '../components/DailyForecast'
import '../styles/SearchBar.css'
import logo from '../search_icon.png'

const BASE_URL = "http://api.openweathermap.org/data/2.5/";
const API_KEY = "6d2f7caed86f6f8ff5bc12647db3d2ba";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchItem: "", weatherTemp: null, nameOfCity: "", dailyForecast:[] };
    }

    handleChange = (e) => {
        this.setState({ searchItem: e.target.value });
    }

    //fetch data from the Open Weather API
    fetchWeatherData = async () => {
        //This is the Open Weather CURRENT WEATHER API
        const path = "weather"
        const parameters = { 
            params: { 
                q: this.state.searchItem,
                units: "imperial",
                appid: API_KEY 
            } 
        };
        let response;
        try {
            response = await axios.get(`${BASE_URL}${path}`, parameters)

            //Set the weatherTemp state to the current weather temperature fetched from the API
            //And name of the city to the name of the city fetched from the API
            this.setState({ weatherTemp: response.data.main.temp, nameOfCity: response.data.name });
        } catch (e) {
            console.log("ERROR GETTING DATA", e)
        }

        //this.fetchDialyForecast() calls the Open Weather ONE CALL API
        //Open Weather ONE CALL API provides DAILY FORECAST for 7 DAYS
        //However, this Open Weather ONE CALL API does not include a query parameter to search for the city.
        //It's main parameters are longitude and latitude 
        //So the ideal way to go about it is to extract the longitude and latitude from the Open Weather CURRENT WEATHER
        //API which is called above after the user enters the name of the city and pass that city's lat & lon into this 
        //function in order to get the daily forecast for 7 days
        this.fetchDialyForecast(response.data.coord.lat, response.data.coord.lon);
    }

    //This functions calls Open Weather ONE CALL API which provides DAILY FORECAST for 7 DAYS
    fetchDialyForecast = async (latitude, longitude) => {
        try {
            const path = "onecall";
            const parameters = {
                params: {
                    lat: latitude,
                    lon: longitude,
                    units: "imperial",
                    exclude: "minutely,alerts",
                    appid: API_KEY
                }
            };
            const response = await axios.get(`${BASE_URL}${path}`, parameters)
            this.setState({dailyForecast:response.data.daily})
        }
        catch (e) {
            console.log("ERROR WITH ONE CALL API", e)
        }
    }

    handleKeyUp = async (e) => {
        //Display the data on the DOM when the user enters
        //the city and hits the enter key
        if (e.keyCode === 13 && this.state.searchItem !== "") {
            this.fetchWeatherData();

            //set the field to be empty after the user hits the Enter key
            this.setState({ searchItem: "" });
            console.log("Search item is...", this.state.searchItem);
        }
    }

    render() {

        return (
            <div className="SearchBar">
                <div className="SearchBar-container">
                    <img className="SearchBar-search_icon" src={logo} alt="search-icon" />
                    <input className="SearchBar-input"
                        type="text"
                        autoComplete="off"
                        placeholder="Search City for current weather"
                        name="searchbar"
                        value={this.state.searchItem}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp}>
                    </input>
                </div>
                <WeatherData
                    itemSearched={this.state.searchItem}
                    temperature={this.state.weatherTemp}
                    city={this.state.nameOfCity}
                />
                <DailyForecast 
                     forecast={this.state.dailyForecast.map(forecast => forecast)}
                     temp={this.state.weatherTemp}
                />
            </div>
        )
    }
}

export default SearchBar;
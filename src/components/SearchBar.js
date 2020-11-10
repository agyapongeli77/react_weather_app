import React, { Component } from 'react';
import axios from 'axios';
import WeatherData from '../components/WeatherData'
import '../styles/SearchBar.css'
import logo from '../search_icon.png'

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchItem: "", weatherTemp: null, nameOfCity:"" };
    }

    handleChange = (e) => {
        this.setState({ searchItem: e.target.value });
    }

    //fetch data from the Open Weather API
    fetchWeatherData = async () => {
        try {
            const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
            const API_KEY = "6d2f7caed86f6f8ff5bc12647db3d2ba"; 
            const parameters = {params : {q:this.state.searchItem, units: "imperial", appid:API_KEY}};
            const response = await axios.get(BASE_URL, parameters )
            this.setState({ weatherTemp: response.data.main.temp, nameOfCity: response.data.name });
            console.log("Name of city is", this.state.nameOfCity);
            console.log(response.data);
        } catch (e) {
            console.log("ERROR GETTING DATA", e)
        }
    }

    handleKeyUp = async (e) => {
        //Display the data on the DOM when the user enters
        //the city and hits the enter key
        if(e.keyCode === 13 && this.state.searchItem !== ""){
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
                    <img className="SearchBar-search_icon" src={logo} alt="search-icon"/>
                    <input className="SearchBar-input" type="text"
                        placeholder="Search"
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
            </div>
        )
    }
}

export default SearchBar;
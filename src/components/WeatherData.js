import React, { Component } from 'react';
import '../styles/WeatherData.css'

class WeatherData extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        //Create individual variables from the prop object by destructing it
        const {city, temperature} = this.props;

        return (
            <div>{
                //Conditional Rendering to show the data on the DOM when we have the
                //temperature from the API otherwise show nothing on the screen
                temperature && 
                <div className="WeatherData">
                    <h2>{city} Weather </h2>
                    <h3>as of {new Date().toLocaleTimeString().toLowerCase()} EST</h3>
                    <h1>{Math.round(temperature)}°</h1>
                </div>
            }
            </div>
        )
    }
}

export default WeatherData;


// return (
//     <div>{
//         //Contional Rendering to show the data on the DOM when we have the
//         //temperature from the API otherwise show nothing
//         this.props.temperature &&
//         <div className="WeatherData">
//             <h2>{this.props.city} Weather </h2>
//             <h3>as of {new Date().toLocaleTimeString().toLowerCase()} EST</h3>
//             <h1>{this.props.temperature}°</h1>
//         </div>
//     }
//     </div>
// )

// return (
//     <div className="WeatherData">
//         <h2>{this.props.city} Weather </h2>
//         <h3>as of {new Date().toLocaleTimeString().toLowerCase()} EST</h3>
//         <h1>{this.props.temperature}°</h1>
//     </div>
// )
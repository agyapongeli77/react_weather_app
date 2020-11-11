import React, { Component } from 'react';
import '../styles/DailyForecast.css'

class DailyForecast extends Component {
    constructor(props) {
        super(props);

        this.timeConverter = this.timeConverter.bind(this);
        this.props.temp && console.log("DAILYFORECAST....", this.props.temp);


    }

    //this function will convert all the timestamps received from the Open Weather API
     timeConverter(UNIX_timestamp){
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }



    render() {
        this.props.temp && console.log("DAILYFORECAST....", this.props.temp);

        return (
            <div>
                <div className="DailyForecast">
                    <h2> Weather </h2>
                    <h3>{this.props.temp}</h3>
                    <h1>DAILY FORECAST°</h1>
                </div>
    
            </div>
        )
    }
}

export default DailyForecast;
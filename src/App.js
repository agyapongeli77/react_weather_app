import React, {Component} from 'react';
import SearchBar from './SearchBar';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <h1>Weather App</h1>
        <SearchBar />
      </div>
    );
  }
}

export default App;

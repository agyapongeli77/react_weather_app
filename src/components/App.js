import React, {Component} from 'react';
import SearchBar from '../components/SearchBar';
import '../styles/App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <h1 className="App-title">Weather App</h1>
        <SearchBar />
      </div>
    );
  }
}

export default App;

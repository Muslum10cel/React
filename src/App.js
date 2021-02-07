import './App.css';
import { Component } from 'react';
import CarList from './cardatabaseapp/CarList';
import Login from './cardatabaseapp/Login';


class App extends Component {
  render(){
  return (
    <div className="App">
      <header className="App-Header">
      <Login />
      </header>
    </div>
  );
  }
}

export default App;

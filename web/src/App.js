import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      text: "Adiós"
    };
    this.getMessage();
  }
  async getMessage(){
    try{
      let resp = await fetch('http://localhost:3001/');
      if (resp.ok){
        let json = await resp.json();
        this.setState({text: json.msg});
      }
    } catch(err){
      console.log(err);
    }

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to {this.state.text}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

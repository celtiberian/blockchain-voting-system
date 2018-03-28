import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      text: "my Contract!",
      voteResult: ""
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
  async vote(number){
    this.setState({ voteResult: "Voting..." });

    let resp = await fetch('http://localhost:3001/' + number);
    if (resp.ok) {
      let json = await resp.json();
      this.setState({ voteResult: json.msg });
    }
    else {
      this.setState({ voteResult: "There was a voting error, try again" });
    }
  }
  async showCounting(number){
    let resp = await fetch('http://localhost:3001/count' + number);
    if (resp.ok) {
      let json = await resp.json();
      this.setState({ voteResult: json.msg });
    }
    else {
      this.setState({ voteResult: "There was an error showing the results, try again" });
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
          Voting System Smart Contract
        </p>
        <div className="Button-panel">
          <ul>
            <li className="Vote-button" onClick={() => { this.vote(0) }}>0</li>
            <li className="Vote-button" onClick={() => { this.vote(1) }}>1</li>
            <li className="Vote-button" onClick={() => { this.vote(2) }}>2</li>
            <li className="Vote-button" onClick={() => { this.vote(3) }}>3</li>
            <li className="Vote-button" onClick={() => { this.vote(4) }}>4</li>
          </ul>
          <ul>
            <li className="Show-button" onClick={() => { this.showCounting(0) }}>Votes</li>
            <li className="Show-button" onClick={() => { this.showCounting(1) }}>Votes</li>
            <li className="Show-button" onClick={() => { this.showCounting(2) }}>Votes</li>
            <li className="Show-button" onClick={() => { this.showCounting(3) }}>Votes</li>
            <li className="Show-button" onClick={() => { this.showCounting(4) }}>Votes</li>
          </ul>
        </div>
        <p className="Vote-results">{this.state.voteResult}</p>
      </div>
    );
  }
}

export default App;

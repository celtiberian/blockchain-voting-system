import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      text: "...",
      voteResult: "",
      popup: "none",
      passphrase: "",
      number: -1
    };

    this.handlePassphraseChange = this.handlePassphraseChange.bind(this);

    this.getMessage();
  }
  handlePassphraseChange(event){
    this.setState({ passphrase: event.target.value });
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
    this.setState({ popup: "block" });

    this.setState({number: number});

    this.setState({ voteResult: "Waiting for a passphrase..." });

    /*
    let resp = await this.sendPassword();
    this.setState({ popup: "none" });
    
    if (this.state.unlocked){
      let resp = await fetch('http://localhost:3001/' + number);
      if (resp.ok) {
        let json = await resp.json();
        this.setState({ voteResult: json.msg });
      }
      else {
        this.setState({ voteResult: "There was a voting error, try again" });
      }
    }
    else {
      this.setState({ voteResult: "Given passphrase was invalid, try again" });
    }
    */
    //this.setState({popup: "none"});
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
  async sendPassword(){
    let resp = await fetch("http://localhost:3001/unlock", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pass: this.state.passphrase
      })
    })

    this.setState({ popup: "none" });
    this.refs.passphraseInput.value = "";
    
    if (resp.ok) {
      resp = await fetch('http://localhost:3001/' + this.state.number);
      if (resp.ok) {
        let json = await resp.json();
        this.setState({ voteResult: json.msg });
      }
      else {
        this.setState({ voteResult: "There was a voting error, try again" });
      }
    }
    else {
      this.setState({ voteResult: "Given passphrase was invalid, try again" });
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
        <div className="popup" style={{ display: this.state.popup }}>
          <div>Enter passphrase to unlock your account:</div>
          <input name="passphrase" type="password" ref="passphraseInput" onChange={this.handlePassphraseChange} /><br/><br/>
          <button className="Show-button" onClick={() => { this.sendPassword() }}>Done</button>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'

class App extends Component {
  constructor(){
    super();
    this.state = {
      text: "my Contract!",
      voteResult: ""
    };

    if (typeof window.web3 !== 'undefined') {
      console.log("Using web3 detected from external source like Metamask")
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    const MyContract = this.web3.eth.contract([
      {
        "constant": false,
        "inputs": [
          {
            "name": "number",
            "type": "uint256"
          }
        ],
        "name": "count",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "number",
            "type": "uint256"
          }
        ],
        "name": "getCounting",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      }
    ]);

    this.state.contractInstance = MyContract.at('0x2D728eb0E83dCBb55cce109b83C8dEDCb6785fD3');
    
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
  vote(number){
    this.setState({ voteResult: "Voting..." });
    /*
    let resp = await fetch('http://localhost:3001/' + number);
    if (resp.ok) {
      let json = await resp.json();
      this.setState({ voteResult: json.msg })
    }
    else {
      this.setState({ voteResult: "There was a voting error, try again" })
    }*/
    this.state.contractInstance.count(number, {
      gas: 300000,
      from: this.web3.eth.accounts[0]
    }, (err, result) => {
      done => {
      }
    })
    this.setState({ voteResult: "You voted for number " + number })
  }
  showCounting(number){
    this.state.contractInstance.getCounting.call(number, (err, result) => {
      if (result != null){
        this.setState({ voteResult: 'Number ' + number + ' has ' + parseInt(result) + ' votes'})
      }
    });
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

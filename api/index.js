
var express = require('express');
var app = express();

const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const input = fs.readFileSync('votingSystem.sol', 'utf8');
const output = solc.compile(input);
const bytecode = output.contracts[':VotingSystem'].bytecode;
const abi = JSON.parse(output.contracts[':VotingSystem'].interface);

const VotingContract = web3.eth.contract(abi);

const deployedContract = VotingContract.new (['Rama', 'Nick', 'Jose'],
  { data: bytecode, from: web3.eth.accounts[0], gas: 4700000 })

const contractInstance = VotingContract.at('0xc9857285db924e026acb4afb0ab6dc4bf20841d7');

/*
contractInstance.Vote(0, { from: web3.eth.accounts[4] });
contractInstance.Vote(0, { from: web3.eth.accounts[5] });
contractInstance.Vote(0, { from: web3.eth.accounts[6] });
*/

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.header('Content-Type', 'application/json');
  res.send({msg: contractInstance.TotalVotesFor.call(0).toString()});
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});



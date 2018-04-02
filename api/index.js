var express = require('express');
var app = express();
const Web3 = require('web3');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Get the ABI either via the Remix IDE or compiling the contract using solc
const MyContract = web3.eth.contract([
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

const contractInstance = MyContract.at('0xd1ccee569bd6791a52fc962439e4ac4c624d7b19'); 

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.header('Content-Type', 'application/json');
  res.send({msg: 'my Contract!'});
});

app.get('/0', function (req, res) {
  res.header('Content-Type', 'application/json');
  contractInstance.count(0, {
    gasPrice: 0,
    from: web3.eth.accounts[0]
  }, (err, result) => {
    done => {
    }
  })
  res.send({ msg: 'You voted for number 0' });
});

app.get('/count0', function (req, res) {
  res.header('Content-Type', 'application/json');
  let votes = contractInstance.getCounting(0).toString();
  res.send({ msg: 'Number 0 has a total amount of ' + votes + ' votes' });  
})

app.get('/1', function (req, res) {
  res.header('Content-Type', 'application/json');
  web3.personal.unlockAccount(web3.eth.accounts[0], 'myblockchain', 10);
  contractInstance.count(1, {
    gasPrice: 0,
    from: web3.eth.accounts[0]
  }, (err, result) => {
    done => {
    }
  })
  res.send({ msg: 'You voted for number 1' });
});

app.get('/count1', function (req, res) {
  res.header('Content-Type', 'application/json');
  let votes = contractInstance.getCounting(1).toString();
  res.send({ msg: 'Number 1 has a total amount of ' + votes + ' votes' });
})

app.get('/2', function (req, res) {
  res.header('Content-Type', 'application/json');
  contractInstance.count(2, {
    gasPrice: 0,
    from: web3.eth.accounts[0]
  }, (err, result) => {
    done => {
    }
  })
  res.send({ msg: 'You voted for number 2' });
});

app.get('/count2', function (req, res) {
  res.header('Content-Type', 'application/json');
  let votes = contractInstance.getCounting(2).toString();
  res.send({ msg: 'Number 2 has a total amount of ' + votes + ' votes' });
})

app.get('/3', function (req, res) {
  res.header('Content-Type', 'application/json');
  contractInstance.count(3, {
    gasPrice: 0,
    from: web3.eth.accounts[0]
  }, (err, result) => {
    done => {
    }
  })
  res.send({ msg: 'You voted for number 3' });
});

app.get('/count3', function (req, res) {
  res.header('Content-Type', 'application/json');
  let votes = contractInstance.getCounting(3).toString();
  res.send({ msg: 'Number 3 has a total amount of ' + votes + ' votes' });
})

app.get('/4', function (req, res) {
  res.header('Content-Type', 'application/json');
  contractInstance.count(4, {
    gasPrice: 0,
    from: web3.eth.accounts[0]
  }, (err, result) => {
    done => {
    }
  })
  res.send({ msg: 'You voted for number 4' });
});

app.get('/count4', function (req, res) {
  res.header('Content-Type', 'application/json');
  let votes = contractInstance.getCounting(4).toString();
  res.send({ msg: 'Number 4 has a total amount of ' + votes + ' votes' });
})

app.post('/unlock', function (req, res) {
  res.header('Content-Type', 'application/json');
  let pass = req.body.pass;
  web3.personal.unlockAccount(web3.eth.accounts[0], pass, 50);
  res.send({ msg: true });
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});

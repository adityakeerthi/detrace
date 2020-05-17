var express = require('express'); //
var router = express.Router(); //
var ethers = require('ethers'); // 
var contract_address = '0xdBd355eA392fEA0DbC273719F8dDc3219E8236B8'; // 
var contract_abi = [
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "covidStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_geoData",
          "type": "string"
        }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "internalType": "string",
          "name": "_geoData",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getCovidStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "status",
          "type": "bool"
        }
      ],
      "name": "changeCovidStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_contact",
          "type": "address"
        }
      ],
      "name": "addContact",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "checkCorona",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "checkSecondary",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "setTree",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getTree",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "clearArr",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
const URL = "HTTP://127.0.0.1:7545";
const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);
let Contract = new ethers.Contract(contract_address, contract_abi, customHttpProvider.getSigner(0));

// router.post('/', async function (req, res, next) {
//     Contract.getConnections(req.body.address).then( (r) => {
//         res.send(r);
//     })
    
// }) // should work



router.post('/', async function (req, res, next) {
    var response = []
    var checked = {}
    var address = req.body.address
    var queue = [address]

    while (queue.length > 0){
      var curAddress = queue[0]
      console.log(curAddress)
      await Contract.setTree(curAddress)
      var nextAddresses = await Contract.getTree(curAddress);
      console.log("NEXT ADDRESSES:" , nextAddresses)
      queue.pop(0)


      for (let i = 0; i < nextAddresses.length; i++){
        // 
        if (checked[nextAddress] !== true){
          
        }
        if (!(nextAddresses[i] in checked)){
          response.push(nextAddresses[i])
          checked[nextAddresses[i]] = true
          queue.push(nextAddresses[i])
        }
      }
    }



    // while (queue.length !== 0){
    //   var nextStack = stack
    //   for (let i=0; i<stack.length; i++) {
    //     var curAddress = stack[i]
    //     await Contract.setTree(curAddress)
    //     var nextAddresses = await Contract.getTree(curAddress);
    //     nextStack.unshift(nextAddresses);
        
    //   }
    //   stack = nextStack
      
    // }
    // [[#first gen][#second gen][#third gen]]

    // while (stack[0]){
    //   curAddress = stack[0]
      
    //   await Contract.setTree(curAddress)
    //   var nextAddresses = await Contract.getTree(curAddress);
    //   console.log(nextAddresses)
    //   await Contract.clearArr();
    //   stack.pop(0)
    //   if (nextAddresses.length > 0){
    //     for (let i = 0; i < nextAddresses.length; i++){
    //       if (!(nextAddresses[i] in checked)){
    //         response.push(nextAddresses[i])
    //         checked[nextAddresses[i]] = true
    //         stack.unshift(nextAddresses[0]);
    //       }
    //     }
    //   }
    // }
    res.send(response)


    // r = await Contract.getTree(req.body.address);


    
    // setTree = await Contract.setTree(address)
    // res.send(r);
    
}) // should work

module.exports = router;

var express = require('express'); //
var router = express.Router(); //
var ethers = require('ethers'); // 
// var IPFS = require('ipfs-api'); // ipfs
var contract_address = '0x763cE4e970c9038Aac27B97fc048B8F72EEE82de'; // 
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
      "name": "getConnections",
      "outputs": [
        {
          "internalType": "address[][]",
          "name": "",
          "type": "address[][]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTree",
      "outputs": [
        {
          "internalType": "address[][]",
          "name": "",
          "type": "address[][]"
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

router.post("/getCovidStatus", async (req, res, next) => {
    r = await Contract.getCovidBalance(req.body.address);
    res.send(r);
});// done

router.post("/changeCovidStatus", async (req, res, next) => {
    r = await Contract.changeCovidStatus(req.body.address, req.body.status);
    res.send(r);

});
// send me accounts
router.post("/addContact", async function (req, res, next) {
    await Contract.addContact(req.body.address, req.body.contact);
    res.send("Contact added"); // this the thing?
})

router.get('/', async function(req, res, next) {
    res.send("init")
});

router.post("/checkCorona", async (req, rest, next) => {
    r = await Contract.checkCorona(req.body.address);
    res.send(r)
});

router.post("/checkSecondary", async (req, rest, next) => {
    r = await Contract.checkSecondary(req.body.address);
    res.send(r)
});

router.get('/clearArr', async (req, res, next) => {
    await Contract.clearArr();
    res.send("Cleared Array");
});

const axios = require('axios'); // axios library because i am familiar with it
const crypto = require('crypto'); // crypt library
const ENCRYPTION_KEY = 'bf3c199c2470cb477d907b1e0917c17b'; // the encrypt key (if deploy don't share)
const INITIALISATION_VECTOR = '5183666c72eec9e4'; // the initialisation vector (if deply don't share)

const ipfs = new IPFS({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
})

var router = express.Router();

const get = async hash => {
    const URL = "https://gateway.ipfs.io/ipfs/" + hash;

    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

var encrypt = ((val) => {
    let cypher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, INITIALISATION_VECTOR);
    let encrypted = cypher.update(val, 'utf8', 'base64');
    encrypted += cypher.final('base64');
    return encrypted;
})

var decrypt = ((encrypted) => {
    let decipher = require('crypto').createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, INITIALISATION_VECTOR);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
});

const uploadToMDB = async (address, longitude, latitude, hash) => {
    if (hash == "h8Uq9J7GwvY1OXx9bURyjgVdkJccsANU3ynt3B/dOLhxURP8OyKQ/81fsZJ+Vp1M") { // {} empty 
        let obj = {}
        
        obj[address] = [
            {
                "longitude": longitude,
                "latitude": latitude
            }
        ]

        let buffer = Buffer.from(JSON.stringify(obj));

        return new Promise((resolve, reject) => {
            ipfs.files.add(buffer, async(err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    const hash = await res[0].hash;
                    const encryptedHash = encrypt(hash);
                    resolve(encryptedHash);
                }
            })
        })

    } else {
        const objHASH = decrypt(hash);
        const MDB = await get(objHASH);
        console.log(MDB[address]);
        if (MDB[address] === undefined) {
            MDB[address] = [{
                "longitude": longitude,
                "latitude": latitude
            }]
        } else {
            MDB[address].unshift({
                "longitude": longitude,
                "latitude": latitude
            })
        }

        let buffer = Buffer.from(JSON.stringify(MDB));

        return new Promise((resolve, reject) => {
            ipfs.files.add(buffer, async (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    const hash = await res[0].hash;
                    const encryptedHash = encrypt(hash);
                    resolve(encryptedHash);
                }

            })

        })

    }

}

/* GET home page. */
// router.post('/geoData', async function (req, res, next) {
//     const WALLET_ADDRESS = req.body.wallet;
//     const GEO_DATA = req.body.geoData;
//     const LONGITUDE = GEO_DATA.longitude;
//     const LATITUDE = GEO_DATA.latitude;
//     const IPFS_HASH = req.body.hash;

//     uploadToMDB(WALLET_ADDRESS, LONGITUDE, LATITUDE, IPFS_HASH).then((newMasterDB) => {
//         await Contract.set(newMasterDB);
//         res.send(`${newMasterDB}`);
//     })
// }); //This gives an error

router.post('/getHash', async function (req, req, next) {
    await Contract.get();
})

router.post('/getConnection', async (req, res, next) => {
    r = await Contract.getConnections(req.body.address);
    // Daniel Algorithm


    res.send(r);
})

module.exports = router;
var express = require('express'); // express
const IPFS = require('ipfs-api'); // ipfs
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
router.post('/', async function (req, res, next) {
    const WALLET_ADDRESS = req.body.wallet;
    const GEO_DATA = req.body.geoData;
    const LONGITUDE = GEO_DATA.longitude;
    const LATITUDE = GEO_DATA.latitude;
    const IPFS_HASH = req.body.hash;

    uploadToMDB(WALLET_ADDRESS, LONGITUDE, LATITUDE, IPFS_HASH).then((newMasterDB) => {
        res.send(`${newMasterDB}`)
    })
});

module.exports = router;

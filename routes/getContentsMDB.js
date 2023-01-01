var express = require('express'); //
var router = express.Router(); //

const get = async hash => {
    const URL = "https://gateway.ipfs.io/ipfs/" + hash;

    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

router.post('/', async function (req, res, next) {
    get(req.body.hash).then((contents) => {
        res.send(contents)
    })
})

module.exports = router;
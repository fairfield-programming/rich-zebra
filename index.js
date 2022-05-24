const express = require('express')
const path = require('path')
const { createHash } = require('node:crypto')

const app = express()
const port = process.env.PORT || 8080;
const hash = createHash('sha256')

let blockchain = [];

function hashFunc(data, prevHash) {
    
    let hashData = "";

    while (!hashData.endsWith("0000")) {

        hashData = hash.update(data.toString() + prevHash.toString()).copy().digest('hex');

    }

    return hashData;

}

function pushBlock(block) {

    let _block = {
        data: block || {},
        hash: hashFunc(JSON.stringify(block), blockchain.slice(-1).hash || "") || ""
    };

    blockchain.push(_block);

    return _block;

}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/blockchain', (req, res) => { return res.json(blockchain); });

app.get('/api/block/add', (req, res) => {

    res.json(
        pushBlock({
            title: req.query.title,
            description: req.query.description
        })
    );

});

app.get('/api/block/:id', (req, res) => {

    if (req.params.id == undefined) return res.status(400).send("No Id Provided!");
    if (blockchain[req.params.id] == undefined) return res.status(404).send("Block not found!");

    res.json(blockchain[req.params.id]);
    
});

app.get('/api/block/:id/delete', (req, res) => { res.json(blockchain.splice(req.params.id, 1)[0]) })

app.listen(port, () => { console.log('Listening on port ' + port) })
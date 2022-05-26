const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8080;

// Blockchain Initialization
const Blockchain = require('./blockchain.js')
let blockchain = new Blockchain()

function createBlock(req) {

    const previousBlock = blockchain.getPreviousBlock(req.params.id);
    const previousHash = blockchain.hash(previousBlock);
    const previousProof = previousBlock['proof'] // why is this not working?
    const proof = blockchain.proofOfWork(previousProof);
    console.log(proof)
    blockchain.addTransaction('NA', 'THE BLOCKCHAIN', blockchain.getRandomArbitrary(0, 10))
    const block = blockchain.createBlock(proof, previousHash)
    const response = {
        message: 'Block mined',
        index: block['index'],
        timestamp: block['timestamp'],
        proof: block['proof'],
        previousHash: block['previousHash'],
        transactions: block['transactions']
    }
    return response
}

app.get('/api/blockchain', (req, res) => {

    res.set("Content-Type", "text/plain");

    res.send(JSON.stringify(blockchain.getChain(), null, 4));
});

app.get('/api/block/:id', (req, res) => {

    if (req.params.id == undefined) return res.status(400).send("No Id Provided!");
    if (blockchain[req.params.id] == undefined) return res.status(404).send("Block not found!");

    res.json(blockchain[req.params.id]);

})

app.get('/api/mine_block', (req, res) => {
    res.set("Content-Type", "text/plain");
    const block = createBlock(req);
    return res.send(JSON.stringify(block, null, 4));
})

app.listen(port, () => { console.log('Listening on port ' + port) })
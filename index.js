const express = require('express')
const path = require('path')
const { createHash } = require('node:crypto')

const app = express()
const port = process.env.PORT || 8080;
const hash = createHash('sha256')


blockchain = [{
    'data': {
        'name': 'Joel Strand',
        'age': 13,
        'grade': 11,
        'time': 12,
        'proof': 100, // This does not effect the hash yet. Fix
    },
    'hash': hash.update('data').copy().digest('hex')
}]

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/blockchain', (req, res) => { return res.json(blockchain); });

app.get('/api/block/:id', (req, res) => {

    if (req.params.id == undefined) return res.status(400).send("No Id Provided!");
    if (blockchain[req.params.id] == undefined) return res.status(404).send("Block not found!");

    res.json(blockchain[req.params.id]);
});

app.get('/api/block/:id/delete', (req, res) => { res.json(blockchain.splice(req.params.id, 1)[0]) })

app.listen(port, () => { console.log('Listening on port ' + port) })
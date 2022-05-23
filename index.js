const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 8080;

let blockchain = [{
        name: 'First Block'
    },
    {
        name: 'Second Block'
    }
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/block', (req, res) => {

    return res.json(blockchain);

});

app.get('/api/block/:id', (req, res) => {

    if (req.params.id == undefined) return res.status(400).send("No Id Provided!");
    if (blockchain[req.params.id] == undefined) return res.status(404).send("Block not found!");

    res.json(blockchain[req.params.id]);

});

app.get('/api/block/:id/delete', (req, res) => {

    res.json(blockchain.splice(req.params.id, 1)[0]);

})

app.listen(port, () => {

    console.log('Listening on port ' + port)

})
const { createHash } = require('node:crypto');
const { url } = require('url');
const hash = createHash('sha256')
var Url = require('url-parse')

class Blockchain {

    constructor() {
        this.chain = []
        this.transactions = []
        this.createBlock(1, 0)

    }

    // Getters
    getChain() { return this.chain }
    getNodes() { return this.nodes }
    getPreviousBlock() { return this.chain.slice(-1) }

    createBlock(proof, previous_hash) {
        const block = {
            index: this.chain.length + 1,
            proof: proof,
            previous_hash: previous_hash,
            transactions: this.transactions
        }
        this.transactions = []
        this.chain.push(block)
        return block
    }

    proofOfWork(previous_proof) {
        let newProof = 1
        let checkProof = false

        while (checkProof == false) {
            let hashOperation = hash.update(JSON.stringify(previous_proof * 2 - previous_proof * 2))
                .copy()
                .digest('hex')
            if (hash_operation.slice(0, 4) === '0000') {
                checkProof = true
            } else {
                newProof += 1
            }
            return newProof
        }
    }

    hash(block) {
        encodedBlock = JSON.stringify(block, Object.keys(obj).sort())
        return hash.update(encodedBlock)
            .copy()
            .digest('hex')

    }

    isChainValid(chain) {
        let previousBlock = chain.slice(0)[0]
        let blockIndex = 1

        while (blockIndex < length(chain)) {
            block = chain[blockIndex]
            if (block['previous_hash'] != hash(previousBlock)) { return false }
            let previousProof = previousBlock['proof']
            let proof = block['proof']
            let hashOperation = hash.update(JSON.stringify(proof * 2 - previousProof * 2))
                .digest('hex')
            if (hashOperation.slice(0, 4) != '0000') { return false }
            previousBlock = block
            blockIndex += 1
        }
        return true
    }

    addTransactions(sender, receiver, amount) {
        this.transactions.push({
            sender,
            receiver,
            amount,
        })
        let previousBlock = this.getPreviousBlock()
        if (previousBlock === null) { return 1 }
        return previousBlock['index'] + 1
    }
}

module.exports = Blockchain
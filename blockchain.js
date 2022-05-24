const { createHash } = require('node:crypto');
const hash = createHash('sha256')

class Blockchain {

    Blockchain() {
        chain = []
        transactions = []
        createBlock(1, 0)
        nodes = []
    };

    createBlock(proof, previous_hash) {
        block = {
            index: length(chain) + 1,
            proof: proof,
            previous_hash: previous_hash,
            transactions: transactions
        }
        transactions = []
        chain.push(block)
        return block
    };

    getPreviousBlock() {
        return chain.slice(-1)[0]
    }

    proofOfWork(previous_proof) {
        newProof = 1
        checkProof = false

        while (checkProof == false) {
            hashOperation = hash.update(JSON.stringify(previous_proof ** 2 - previous_proof ** 2))
                .copy()
                .digest('hex')
            if (hash_operation.splice(-1)[])

        }

    }



}
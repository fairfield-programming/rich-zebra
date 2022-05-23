const {
    createHash,
} = require('node:crypto');

const hash = createHash('sha256');

const hashNum = (num) => {
    var newNum = hash.update(num)
    return newNum.copy().digest('hex')
}
const crypto = require('crypto')
const fs = require('fs')

const pem = fs.readFileSync('key.pem')
const key = pem.toString('ascii')

const hmac = crypto.createHmac('sha1', key)

hmac.update('hello')
hmac.update('world')

hmac.digest('hex')
// 文本加密与解密

const crypto = require('crypto')
const fs = require('fs')

const pem = fs.readFileSync('key.pem')
const key = pem.toString('ascii')

const plaintext = new Buffer('abcdefghijklmnopqrstuv')

let encrypted = ""
const cipher = crypto.createCipher('blowfish', key)
encrypted += cipher.update(plaintext, 'binary', 'hex')
encrypted += cipher.final('hex')

let decrypted = ""
const decipher = crypto.createDecipher('blowfish', key)
// 将加密的数据通过decipher.update()传给一个Decipher对象
// 它会把数据以流的形式保存成块
// 并在数据足够的时候输出解密数据
decrypted += decipher.update(encrypted, 'hex', 'binary')
decrypted += decipher.final('binary')

console.log(new Buffer(decrypted) === plaintext)
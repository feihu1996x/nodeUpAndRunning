const crypto = require('crypto')
const fs = require('fs')

var pem = fs.readFileSync('key.pem')
var key = pem.toString('ascii')

// 指定签名算法，创建sign对象
const sign = crypto.createSign('RSA-SHA256')

// 给sign对象添加数据
sign.update('abcdef')

// 使用私钥
// 调用sign.sign()给数据进行签名
// 使用十六进制输出
console.log(sign.sign(key, 'hex'))
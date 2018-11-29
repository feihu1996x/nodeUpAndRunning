const crypto = require('crypto')
const fs = require('fs')

const privatePem = fs.readFileSync('key.pem')
const publicPem = fs.readFileSync('cert.pem')
const key = privatePem.toString()
const pubkey = publicPem.toString()

let data = "abcdef"

const sign = crypto.createSign('RSA-SHA256')
sign.update(data)
const sig = sign.sign(key, 'hex')

// 指定签名算法，创建verify对象
const verify = crypto.createVerify('RSA-SHA256')

// 给verify对象添加数据
verify.update(data)

// 使用公钥
// 调用verify.verify()对签名进行验证
// 签名使用十六进制格式
console.log(verify.verify(pubkey, sig, 'hex'))
// => 1

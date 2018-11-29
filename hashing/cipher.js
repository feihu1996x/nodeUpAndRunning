const crypto = require('crypto')
const fs = require('fs')

const pem = fs.readFileSync('key.pem')
const key = pem.toString('ascii')

// Cipher类提供了用私钥加密数据的功能
// 该工厂方法输入一个算法和私钥，然后创建cipher对象
// 支持的算法是从本机安装的OpenSSL实现中支持的
// 如blowfish和aes192
// 许多现代的加密算法使用块密码
// 也就是输出的通常是标准大小的“块”
// 块大小与使用的算法有关
// 如blowfish使用的是40字节的块
const cipher = crypto.createCipher('blowfish', key)

// 和Hash、Hmac类似，Cipher API也采用update()来输入数据
// 如果cipher对象中的数据加上传给cipher.update()的数据
// 足够用来创建一个或多个加密块
// 那么这些加密数据就会被返回
// 如果数据不足以构成一个加密块
// 输入会被保存在cipher对象内

// 传入了一个新的Buffer对象（包含了内容已有的垃圾数据）
// 指定了输入格式为二进制
// 指定了输出格式为十六进制
cipher.update(new Buffer(4), 'binary', 'hex')
// => ''

// 有了足够的数据来生成加密块
// 我们得到了十六进制格式的加密数据
cipher.update(new Buffer(4), 'binary', 'hex')
// => 'ff57e5f742689c85'

cipher.update(new Buffer(4), 'binary', 'hex')
// => ''

// 当调用cipher.final()时
// cipher对象中剩余的所有数据都会被加密并返回
// 但会添加足够的填充使其满足块大小的要求

// 如果我们输入的数据超过一个块所需要的大小
// cipher.final()会先返回尽可能多的加密块
// 然后才会采用补全的方法
cipher.final('hex')
const crypto = require('crypto')
const md5 = crypto.createHash('md5')

// 可以用更多的数据不停地更新哈希
// 添加到哈希对象的数据
// 只是简单地追加到前一次传入的数据尾部
md5.update('hello')
md5.update('world')

// 把所有通过hash.update()输入的数据
// 生成摘要并输出
// 调用hash.digest()之后
// Hash对象就已经最终确定
// 而且不能被重用

// 二进制Buffer输出(默认)
// console.log(md5.digest())

// Base64编码输出
// console.log(md5.digest('base64'))

// 十六进制输出
console.log(md5.digest('hex'))


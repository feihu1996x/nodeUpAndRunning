// 用8位字节数组
// 创建一个3个字节的Buffer
console.log(new Buffer([255, 0, 149]))
// => <Buffer ff 00 95>

// 指定字节长度创建Buffer
console.log(new Buffer(10))
// => <Buffer e1 43 17 05 01 00 00 00 41 90>

// 用字符串创建Buffer
// 默认是UTF-8编码
console.log(new Buffer('foobarbaz'))
// => <Buffer 66 6f 6f 62 61 72 62 61 7a>

console.log(new Buffer('foobarbaz', 'ascii'))
// => <Buffer 66 6f 6f 62 61 72 62 61 7a>

console.log(new Buffer('foobarbaz', 'utf8'))
// => <Buffer 66 6f 6f 62 61 72 62 61 7a>

console.log(new Buffer('é'))
// => <Buffer c3 a9>

console.log(new Buffer('é', 'utf8'))
// => console.log(new Buffer('é', 'utf8'))

// 当输入“é”字符时
// 当指定编码为ASCII时
// 字符被截断成单个字节
console.log(new Buffer('é', 'ascii'))
// => <Buffer e9>

// 创建一个大小为1个字节的Buffer对象 
var b = new Buffer(1)

// 把字符串写到Buffer指定的位置上
// 返回一个数字
// 表示有多少字节被成功写入
b.write('a')
// => 1

// 获得字符串在编码上的字节长度
console.log(b.byteLength)
// => 1

// 如果从Buffer指定位置开始有足够空间的话
// 整个字符串都会被写入
// 否则，字符串的尾部会被截断
// 好让其大小能放入Buffer
// 对于UTF-8字符串来说
// 如果一个完整字符无法写入到Buffer的话
// 就不会单独写入该字符的某个字节
b.write('é')
// => 0

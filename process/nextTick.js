const http = require('http')

const server = http.createServer((req, res)=>{
    res.writeHead(200, {})
    res.end('foo')
    console.log('http response')
    process.nextTick(()=>{
        // 用process.nextTick()
        // 往事件循环队列里插入回调函数
        // 它会在下一个tick或者事件循环下一次迭代时被调用
        // 在这里
        // 无论我们向HTTP服务器发起多少次请求，
        // tick每次都会出现在事件循环的下一个轮回中
        console.log('tick')
    })
})

server.listen(8000, ()=>{
    console.log('Server running at http://127.0.0.1:8000')
})
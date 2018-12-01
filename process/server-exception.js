const http = require('http')

const server = http.createServer((req, res)=>{
    res.writeHead(200, {})
    res.end('response')
    // 调用了不存在的函数
    // 会触发一个异常
    // 该异常会被全局监听器捕获
    // 但该异常被封装在一个特定的代码路径上
    // 所以Node只会阻止正在运行的回调函数
    // 而服务器能够继续运行
    badLoggingCall('sent response')
    console.log('sent response')
})

process.on('uncaughtException', (e)=>{
    console.log(e)
})

server.listen(8080, ()=>{
    console.log('Server running at http://127.0.0.1:8080')
})
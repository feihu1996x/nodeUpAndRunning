const http = require('http')

const server = http.createServer()

const reqHandler = function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello,World!\n')
}

// 显式地添加request事件监听器
// 并且命名函数来处理request事件
// 增加了可读性
server.on('request', reqHandler)

server.listen(8125, ()=>{
    console.log('Server running at http://127.0.0.1:8125')
})
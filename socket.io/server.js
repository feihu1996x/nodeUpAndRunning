/**
 *  创建Socket.IO服务器 
 * */

const http = require('http')
const io = require('socket.io')

const server = http.createServer()

server.on('request', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello, World!')
})

server.listen(3000, ()=>{
    console.log('Server running at http://127.0.0.1:3000')
})

//  调用工厂方法io.listen()创建一个socket.io服务器
//  将自带的事件监听器包装在发送到http服务器的所有请求上
//  监听器会查找从Socket.IO客户端发送来的请求，并对应处理
//  对于其他的请求，它会以原本的工作方式传递给HTTP服务器
const socket = io.listen(server)

socket.on('connection', (client)=>{
    // socket 是持久性连接
    // 使用传入的 client 对象来与每个浏览器进行通信
    console.log('Client connected')
})

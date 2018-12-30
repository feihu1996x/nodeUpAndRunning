/**
 * 使用命名空间的Socket.IO服务器
 */

const http = require('http')
const io = require('socket.io')
const fs = require('fs')

const sockFile = fs.readFileSync('namespace.html')

const server = http.createServer()

server.on('request', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(sockFile)
})

server.listen(3000, ()=>{
    console.log('Server running at http://127.0.0.1:3000')
})

const socket = io.listen(server)

//  socket.of函数把socket对象切分成多个独立的命名空间
//  举个例子
//  如果一个客户端连接到 http://localhost:3000/weather 并发起 emit() 命令
//  它的结果只会在/weather命名空间里被处理

socket
.of('/upandrunning')
.on('connection', (client)=>{
    console.log('Client connected to Up and Running namespace.')
    client.send('Welcome to Up and Running')
})

socket
.of('/weather')
.on('connection', (client)=>{
    console.log('Client connected to Weather namespace.')
    client.send('Welcome to Weather Updates')
})
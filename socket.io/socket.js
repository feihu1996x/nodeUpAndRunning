/**
 * 一个简单的 Socket.IO 服务器
 */

const http = require('http')
const io = require('socket.io')
const fs = require('fs')

const socketFile = fs.readFileSync('socket.html')

const server = http.createServer()

server.on('request', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(socketFile)
})

server.listen(3000, ()=>{
    console.log('Server running at http://127.0.0.1:3000')
})

const socket = io.listen(server)

socket.on('connection', (client)=>{
    console.log('Client connected')
    client.send('Welcome client ' + client.id)
})
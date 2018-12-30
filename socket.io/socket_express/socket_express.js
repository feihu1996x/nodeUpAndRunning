const app = require('express')()
const http = require('http')
const io = require('socket.io')

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/socket_express.html')
})

const server = http.createServer(app)

server.listen(3000, ()=>{
  console.log(`Server running at http://127.0.0.1:3000`)
})

const socketIo = io.listen(server)

socketIo.on('connection', (socket)=>{
    socket.emit('news', {
        title: 'Welcome to World News',
        contents: 'This news flash was sent from Node.js',
        allowResponse: true,
    })
    socket.on('scoop', (data)=>{
        socket.emit('news', {
            title: 'Circular Emissions Worked',
            contents: 'Received this content:' + data.contents,
        })
    })
})
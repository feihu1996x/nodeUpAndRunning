// app.js

const io = require('socket.io')
const express = require('express')
const app = express.createServer()
const store = new express.session.MemoryStore
const utils = require('connect').utils
const Session = require('connect').middleware.session.Session

app.configure(function () {
    app.use(express.cookieParser())
    app.use(express.session({
        secret: 'secretKey', 
        key: 'express.sid',
        store: store
    }))
    app.use(function (req, res) {
        var sess = req.session
        res.render('socket.jade', {
            email: sess.email || ''
        })
    })
})

app.listen(8080)

const sio = io.listen(app)

sio.configure(function () {
    sio.set('authorization', function (data, accept) {
        var cookies = utils.parseCookie(data.headers.cookie)
        data.sessionID = cookies['express.sid']
        data.sessionStore = store
        store.get(data.sessionID, function (err, session) {
            if (err || !session) {
                return accept("Invalid session", false)
            }
            data.session = new Session(data, session)
            accept(null, true)
        })
    })
    sio.sockets.on('connection', function (socket) {
        var session = socket.handshake.session
        socket.join(socket.handshake.sessionId)
        socket.on('emailupdate', function (data) {
            session.email = data.email
            session.save()
            sio.sockets.in(socket.handshake.sessionId).emit('emailchanged', {
                email: data.email
            })
        })
    })
})
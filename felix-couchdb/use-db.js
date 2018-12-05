const couchdb = require('felix-couchdb')

const dbHost = '127.0.0.1'
const dbPort = 5984
const dbUser = 'root'
const dbPass = 'Q6$%xO0s'
const dbName = 'test'

const client = couchdb.createClient(dbHost, dbPort, dbUser, dbPass)

//  使用名为'test'的数据库
const db = client.db(dbName)
db.exists(function(err, exists){
    if(!exists){
        //  如果'test'数据库不存在
        //  则创建它
        db.create()
        console.log('Database ' + dbName + ' created.')
    }else{
        console.log('Database ' + dbName + ' exists.')
    }
})

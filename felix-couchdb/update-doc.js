const couchdb = require('felix-couchdb')

const dbHost = '127.0.0.1'
const dbPort = 5984
const dbUser = 'root'
const dbPass = 'Q6$%xO0s'
const dbName = 'test'

const client = couchdb.createClient(dbHost, dbPort, dbUser, dbPass)

const db = client.db(dbName)

db.getDoc('Gao', function(err, doc){
    if(err){
        console.log(err)
    }else{
        doc.email = 'gsx0312@qq.com'
        //  更新文档使用的是与创建文档一样的saveDoc 命令
        //  如果CouchDB检测到有同样ID的记录存在
        // 它会把旧的记录覆盖
        db.saveDoc('Gao', doc)
        db.getDoc('Gao', function(err, revisedUser){
            console.log(revisedUser)
        })
    }
})
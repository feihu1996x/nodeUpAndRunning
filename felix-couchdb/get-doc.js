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
        //  如果记录不存在
        //  回调函数的error参数会包含错误信息
        console.log(err)
    }else{
        console.log(doc)
        // =>
        // {
        //     _id: 'Gao',
        //     _rev: '1-4ad0a73ca5c5ebcd63464ffbfde7d72b',
        //     name: { 
        //         first: 'Shaoxiang', 
        //         last: 'Gao'
        //     } 
        // }        
    }
})
const couchdb = require('felix-couchdb')

const dbHost = '127.0.0.1'
const dbPort = 5984
const dbUser = 'root'
const dbPass = 'Q6$%xO0s'
const dbName = 'test'

const client = couchdb.createClient(dbHost, dbPort, dbUser, dbPass)

const db = client.db(dbName)

db.getDoc('Gao', function(err, doc){
    //  在CouchDB里删除文档
    //  需要同时提供ID和版本号
    db.removeDoc(doc._id, doc._rev)
})
const mongo = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const dbName = 'node-mongo-examples'

mongo.connect(url, {
    useNewUrlParser:true
}, (err, client)=>{
    const db = client.db(dbName)
    db.collection('users', (err, collection)=>{
        collection.insertOne({
            username: 'angus',
            firstname: 'angus',
        }, (err, docs)=>{
            console.log(docs.ops)
            client.close()
        })
    })        
})
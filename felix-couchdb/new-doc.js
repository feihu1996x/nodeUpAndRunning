const couchdb = require('felix-couchdb')

const dbHost = '127.0.0.1'
const dbPort = 5984
const dbUser = 'root'
const dbPass = 'Q6$%xO0s'
const dbName = 'test'

const client = couchdb.createClient(dbHost, dbPort, dbUser, dbPass)

const db = client.db(dbName)

let user = {
    name: {
        first: 'Shaoxiang',
        last: 'Gao'
    }
}

db.saveDoc('Gao', user, function(err, doc){
    //  创建了一个用户
    //  名为 Shaoxiang Gao
    //  并以'Gao'作为标识保存在数据库test中
    if(err){
        console.log(JSON.stringify(err))
    }else{
        console.log('Saved user.')
        //  现在可以打开浏览器
        // 输入地址http://root:Q6$%xO0s@127.0.0.1:5984/test/Gao
        // 访问该用户信息
    }
})
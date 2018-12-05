// 通过 Node 对 Redis 进行基础的 set 和 get 操作
const redis = require('redis'),
    client = redis.createClient()

client.on('error', (err)=>{
    console.log(err)
})

console.log('Setting key1')
client.set('key1', 'My String1', redis.print)

console.log('Getting key1')
client.get('key1', (err, reply)=>{
    console.log('Results for key1:')
    console.log(reply)
    client.end(true)
})
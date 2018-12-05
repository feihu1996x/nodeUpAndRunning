const redis = require('redis'),
    client = redis.createClient()

client.on('error', (err)=>{
    console.log(err)
})

console.log('Setting user hash')

// 同时设置多个 hash 值
client.hmset('user', 'username', 'Angus Charles', 'firstname', 'angus', 'lastname', 'charles')

client.hkeys('user', (err, replies)=>{
    console.log('Results for user')
    console.log(replies.length + ' replies:')
    replies.forEach((reply, i)=>{
        console.log(i + ' :' + reply)
    })
    client.end(true)
})
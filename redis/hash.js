// 哈希表是包含多个key的对象

const redis = require('redis')
    client = redis.createClient()

client.on('error', (err)=>{
    console.log(err)
})

console.log('Setting user hash')

// 每次设置一个 hash 值
client.hset('user', 'username', 'Angus Charles')
client.hset('user', 'firstname', 'angus')
client.hset('user', 'lastname', 'charles')

client.hkeys('user', (err, replies)=>{
    console.log('Results for user:')
    console.log(replies.length + ' replies:')
    replies.forEach((reply, i)=>{
        console.log(i + ': ' + reply)
    })
    client.end(true)
})

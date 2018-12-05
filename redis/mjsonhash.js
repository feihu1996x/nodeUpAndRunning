const redis = require('redis')
    client = redis.createClient()

client.on('error', (error)=>{
    console.log(error)
})

let user = {
    username: 'Angus Charles',
    firstname: 'angus',
    lastname: 'charles',
    email: 'gsx0312@qq.com',
    website: 'feihu1996.cn',
}

console.log('Setting user hash:')

//  使用对象来设置多个 hash 值
client.hmset('user', user)

client.hkeys('user', (err, replies)=>{
    console.log('Results for user')
    console.log(replies.length + ' replies:')
    replies.forEach((reply, i)=>{
        console.log(i + ' :' + reply)
    })
    client.end(true)
})

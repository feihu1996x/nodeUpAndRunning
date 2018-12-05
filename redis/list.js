const redis = require('redis'),
    client = redis.createClient()
    
client.on('error', (error)=>{
    console.log(error)
})

client.lpush('pendingusers', 'user0')
client.lpush('pendingusers', 'user1')
client.lpush('pendingusers', 'user2')
client.lpush('pendingusers', 'user3')

client.rpop('pendingusers', (error, username)=>{
    if(!error){
        console.log('Processing ' + username)
    }
    client.end(true)
})
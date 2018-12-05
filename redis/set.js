const redis = require('redis'),
    client = redis.createClient()

client.on('error', (error)=>{
    console.log(error)
})

client.sadd('myteam', 'member0')
client.sadd('myteam', 'member1')
client.sadd('myteam', 'member2')
client.sadd('myteam', 'member3')
client.sadd('myteam', 'member4')

client.smembers('myteam', (error, members)=>{
    console.log(members)
    client.end(true)
})

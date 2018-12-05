const redis = require('redis'),
    client = redis.createClient()

client.on('error', (error)=>{
    console.log(error)
})

client.zadd('contestants', 60, 'member0')
client.zadd('contestants', 65, 'member1')
client.zadd('contestants', 26, 'member2')
client.zadd('contestants', 62, 'member3')
client.zadd('contestants', 24, 'member4')
client.zadd('contestants', 39, 'member5')
client.zadd('contestants', 26, 'member6')
client.zadd('contestants', 46, 'member7')
client.zadd('contestants', 63, 'member8')
client.zadd('contestants', 27, 'member9')
client.zadd('contestants', 27, 'member10')
client.zadd('contestants', 51, 'member11')
client.zadd('contestants', 41, 'member12')
client.zadd('contestants', 47, 'member13')
client.zadd('contestants', 40, 'member14')

client.zcard('contestants', (error, length)=>{
    if(!error){
        let contestantCount = length
        let membersPerTeam = Math.ceil(contestantCount / 3)
        client.zrange('contestants', membersPerTeam * 0, membersPerTeam * 1 - 1, (error, values)=>{
            if(error){
                console.log(error)
            }else{
                console.log('Young team: ' + values)
            }
        })
        client.zrange('contestants', membersPerTeam * 1, membersPerTeam * 2 - 1, (error, values)=>{
            if(error){
                console.log(error)
            }else{
                console.log('Middle team: ' + values)
            }            
        })
        client.zrange('contestants', membersPerTeam * 2, membersPerTeam * 3 - 1, (error, values)=>{
            if(error){
                console.log(error)
            }else{
                console.log('Elder team: ' + values)
                client.end(true)
            }            
        })
    }
})